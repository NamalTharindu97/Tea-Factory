const asyncHandler = require("express-async-handler");
const Employe = require("../models/employeeModel");
const bcrypt = require("bcrypt");

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
  const { name, email, phone, gender, age, role, password } = req.body;
  if (!name || !email || !phone || !gender || !age || !role || !password) {
    res.status(400);
    throw new Error("all fields are mandotory");
  }
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
  res.status(200).json("login employee");
});

//@desc GET  current  Employee
//@Route GET /api/v1/tea-factory/employees/current
//@access public
const currentEmployee = asyncHandler(async (req, res) => {
  res.status(200).json("success");
});

module.exports = {
  getEmployee,
  getSingleEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  loginEmployee,
  currentEmployee,
};
