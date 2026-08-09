const asyncHandler = require("express-async-handler");
const Employe = require("../models/employeeModel");
const Payroll = require("../models/payrollModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Generates the next employeeId (E001, E002, ...) from the highest existing one.
const nextEmployeeId = async () => {
  const last = await Employe.find({}, { employeeId: 1 })
    .sort({ employeeId: -1 })
    .limit(1);
  const seq = last.length ? parseInt(String(last[0].employeeId).replace(/\D/g, ""), 10) || 0 : 0;
  return `E${String(seq + 1).padStart(3, "0")}`;
};

const DEFAULT_IMG = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

//@desc GET all Employee (optional ?status=&role=&department=&search=)
//@Route GET /api/v1/tea-factory/employees
//@access authenticated
const getEmployee = asyncHandler(async (req, res) => {
  const { status, role, department, search } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (role) filter.role = role;
  if (department) filter.department = department;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { employeeId: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { position: { $regex: search, $options: "i" } },
    ];
  }
  const employees = await Employe.find(filter);
  res.status(200).json(employees);
});

//@desc GET Single Employee
//@Route GET /api/v1/tea-factory/employees/:id
//@access authenticated
const getSingleEmployee = asyncHandler(async (req, res) => {
  const employe = await Employe.findById(req.params.id);
  if (!employe) {
    res.status(404);
    throw new Error("Employee Not Found");
  }
  res.status(200).json(employe);
});

//@desc POST create new Employee
//@Route POST /api/v1/tea-factory/employees
//@access HR Manager
const createEmployee = asyncHandler(async (req, res) => {
  const { name, email, phone, gender, age, role, password, img, nic, department, position, basicSalary, epfNo, bankAccount, address, hireDate } = req.body;
  if (!name || !email || !phone || !gender || !age || !role || !password) {
    res.status(400);
    throw new Error("all fields are mandotory");
  }

  const imageUrl = img ? img : DEFAULT_IMG;
  const hashPassword = await bcrypt.hash(password, 10);
  const employee = await Employe.create({
    name,
    employeeId: await nextEmployeeId(),
    email,
    phone,
    gender,
    img: imageUrl,
    age,
    role,
    nic,
    department: department || "General",
    position: position || "",
    basicSalary: Number(basicSalary) || 0,
    epfNo: epfNo || "",
    bankAccount: bankAccount || "",
    address: address || "",
    hireDate: hireDate || Date.now(),
    password: hashPassword,
  });
  if (!employee) {
    res.status(404);
    throw new Error("Employee data not valid");
  }
  res.status(201).json(employee);
});

//@desc PUT update employee (optionally change password)
//@Route PUT /api/v1/tea-factory/employees/:id
//@access HR Manager
const updateEmployee = asyncHandler(async (req, res) => {
  const employe = await Employe.findById(req.params.id);
  if (!employe) {
    res.status(404);
    throw new Error("Employee Not Found");
  }
  const { name, email, phone, gender, age, role, img, nic, department, position, basicSalary, epfNo, bankAccount, address, hireDate, status, password } = req.body;

  const fields = {
    name,
    email,
    phone,
    gender,
    age,
    role,
    img,
    nic,
    department,
    position,
    basicSalary,
    epfNo,
    bankAccount,
    address,
    hireDate,
    status,
  };
  // Only write fields that were actually sent so partial updates don't wipe data.
  Object.keys(fields).forEach((k) => fields[k] === undefined && delete fields[k]);
  if (fields.basicSalary !== undefined) fields.basicSalary = Number(fields.basicSalary) || 0;
  if (password) fields.password = await bcrypt.hash(password, 10);

  const newEmploye = await Employe.findByIdAndUpdate(req.params.id, fields, { new: true, runValidators: true });

  // Keep denormalized names on existing pay slips in sync.
  if (name && name !== employe.name) {
    await Payroll.updateMany({ employee: employe._id }, { $set: { employeeName: name } });
  }
  res.status(200).json(newEmploye);
});

//@desc DELETE  Employee (soft-delete: deactivates, keeps payroll history)
//@Route DELETE /api/v1/tea-factory/employees/:id
//@access HR Manager
const deleteEmployee = asyncHandler(async (req, res) => {
  const employe = await Employe.findById(req.params.id);
  if (!employe) {
    res.status(404);
    throw new Error("Employee Not Found");
  }
  const deactivated = await Employe.findByIdAndUpdate(req.params.id, { status: "terminated" }, { new: true });
  res.status(200).json(deactivated);
});

//@descPOST  login  Employee (by name OR employeeId)
//@Route POST /api/v1/tea-factory/employees/login
//@access public
const loginEmployee = asyncHandler(async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    res.status(400);
    throw new Error("all fields are mandotory");
  }
  const user = await Employe.findOne({ $or: [{ name }, { employeeId: name }] });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          name: user.name,
          employeeId: user.employeeId,
          email: user.email,
          id: user.id,
          role: user.role,
          img: user.img,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "180m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("name or password not valid");
  }
});

//@desc GET  count  Employee
//@Route GET /api/v1/tea-factory/employees/count
//@access authenticated
const getEmpCount = asyncHandler(async (req, res) => {
  const count = await Employe.countDocuments({ status: { $ne: "terminated" } });
  res.status(200).json({ count });
});

//@desc GET  current  Employee
//@Route GET /api/v1/tea-factory/employees/current
//@access authenticated
const currentEmployee = asyncHandler(async (req, res) => {
  const user = await Employe.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("Employee Not Found");
  }
  res.status(200).json(user);
});

//@desc GET  gender  count
//@Route GET /api/v1/tea-factory/employees/genderCount
//@access authenticated
const getEmployeeCount = asyncHandler(async (req, res) => {
  const maleCount = await Employe.countDocuments({ gender: "male", status: { $ne: "terminated" } });
  const femaleCount = await Employe.countDocuments({ gender: "female", status: { $ne: "terminated" } });
  res.status(200).json({ maleCount, femaleCount });
});

//@desc GET  monthly  hire  count
//@Route GET /api/v1/tea-factory/employees/monthlyEmployeCount
//@access authenticated
const getMonthlyEmployeeCount = asyncHandler(async (req, res) => {
  const monthlyCount = await Employe.aggregate([
    { $match: { status: { $ne: "terminated" } } },
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  res.status(200).json(monthlyCount);
});

//@desc PUT  change own password
//@Route PUT /api/v1/tea-factory/employees/password
//@access authenticated
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    res.status(400);
    throw new Error("currentPassword and newPassword are required");
  }
  if (newPassword.length < 6) {
    res.status(400);
    throw new Error("new password must be at least 6 characters");
  }
  const user = await Employe.findById(req.user.id);
  if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
    res.status(401);
    throw new Error("current password is not valid");
  }
  const hashed = await bcrypt.hash(newPassword, 10);
  await Employe.findByIdAndUpdate(req.user.id, { password: hashed });
  res.status(200).json({ message: "password updated" });
});

module.exports = {
  getEmployee,
  getSingleEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  loginEmployee,
  currentEmployee,
  getEmpCount,
  getEmployeeCount,
  getMonthlyEmployeeCount,
  changePassword,
};
