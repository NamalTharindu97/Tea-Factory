const asyncHandler = require("express-async-handler");
const Employe = require("../models/employeeModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc GET all Employee
//@Route GET /api/v1/tea-factory/employees
//@access public
const getEmployee = asyncHandler(async (req, res) => {
  const employees = await Employe.find();
  res.status(200).json(employees);
});

//@desc GET Single Employee
//@Route GET /api/v1/tea-factory/employees/:id
//@access public
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
//@access public
const createEmployee = asyncHandler(async (req, res) => {
  const { name, email, phone, gender, age, role, password, img } = req.body;
  if (!name || !email || !phone || !gender || !age || !role || !password) {
    res.status(400);
    throw new Error("all fields are mandotory");
  }
  // Set default image if `img` field is not present
  const imageUrl = img ? img : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  const userAvailable = await Employe.findOne({ name });
  if (userAvailable) {
    res.status(400);
    throw new Error("this name already taken");
  }
  //hash the password
  const hashPassword = await bcrypt.hash(password, 10);
  const employee = await Employe.create({
    name,
    email,
    phone,
    gender,
    img: imageUrl,
    age,
    role,
    password: hashPassword,
  });
  if (!employee) {
    res.status(404);
    throw new Error("Employee data not valid");
  }
  res.status(201).json(employee);
});

//@desc PUT update employee
//@Route GET /api/v1/tea-factory/employees:id
//@access public
const updateEmployee = asyncHandler(async (req, res) => {
  const employe = await Employe.findById(req.params.id);
  if (!employe) {
    res.status(404);
    throw new Error("Employee Not Found");
  }
  const newEmploye = await Employe.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(newEmploye);
});

//@desc DELETE  Employee
//@Route DELETE /api/v1/tea-factory/employees:id
//@access public
const deleteEmployee = asyncHandler(async (req, res) => {
  const employe = await Employe.findById(req.params.id);
  if (!employe) {
    res.status(404);
    throw new Error("Employee Not Found");
  }
  const deleteEmp = await Employe.findByIdAndDelete(req.params.id);
  res.status(200).json(deleteEmp);
});

//@descPOST  login  Employee
//@Route POST /api/v1/tea-factory/employees/login
//@access public
const loginEmployee = asyncHandler(async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    res.status(400);
    throw new Error("all fields are mandotory");
  }
  const user = await Employe.findOne({ name });
  //compare password with hashpasword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          name: user.name,
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
    throw new Error("email or password not valid");
  }
});
//@desc GET  count  Employee
//@Route GET /api/v1/tea-factory/employees/count
//@access public
const getEmpCount = asyncHandler(async (req, res) => {
  const count = await Employe.countDocuments();
  if (!count) {
    res.status(404);
    throw new Error("Count Not Found");
  }

  res.status(200).json({ count });
});

//@desc GET  current  Employee
//@Route GET /api/v1/tea-factory/employees/current
//@access public
const currentEmployee = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

//@desc GET  current  Employee count
//@Route GET /api/v1/tea-factory/employees/count
//@access public
const getEmployeeCount = asyncHandler(async (req, res) => {
  const maleCount = await Employe.countDocuments({ gender: "male" });
  const femaleCount = await Employe.countDocuments({ gender: "female" });
  if (!maleCount || !femaleCount) {
    res.status(404);
    throw new Error("count was not parsing");
  }
  res.status(200).json({ maleCount: maleCount, femaleCount: femaleCount });
});

//@desc GET  current  Employee count
//@Route GET /api/v1/tea-factory/employees/count
//@access public
const getMonthlyEmployeeCount = asyncHandler(async (req, res) => {
  const monthlyCount = await Employe.aggregate([
    // group the employees
    {
      $group: {
        _id: { $month: "$createdAt" },
        //  number of employees created
        count: { $sum: 1 },
      },
    },
    {
      // as the month number (1 to 12)
      $sort: { _id: 1 },
    },
  ]);
  if (!monthlyCount) {
    res.status(404);
    throw new Error("monthly list not parsing");
  }
  res.status(200).json(monthlyCount);
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
};
