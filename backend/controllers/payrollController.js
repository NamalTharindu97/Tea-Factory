const asyncHandler = require("express-async-handler");
const Payroll = require("../models/payrollModel");

//@desc GET all payroll
//@Route GET /api/v1/tea-factory/payrolls/
//@access public
const getPayroll = (req, res) => {
  res.status(200).json("payroll is here");
};

//@desc GET Single payroll
//@Route GET /api/v1/tea-factory/payrolls/:id
//@access public
const getSinglePayroll = (req, res) => {
  res.status(200).json("single payroll is here");
};

//@desc POST create new payrolls
//@Route POST /api/v1/tea-factory/payrolls
//@access public
const createPayroll = asyncHandler(async (req, res) => {
  const { empName, empId, basicSalary, overtime, bonus, totoalEarnings, fedaralTax, stateTax, medicare, totalDeduction, netPay } = req.body;
  if (!empName || !empId || !basicSalary || !overtime || !bonus || !totoalEarnings || !fedaralTax || !stateTax || !medicare || !totalDeduction || !netPay) {
    res.status(400);
    throw new Error("all fields are mandotory");
  }
  const userAvailable = await Payroll.findOne({ empId });
  if (userAvailable) {
    res.status(400);
    throw new Error("this name already taken");
  }

  const payroll = await Payroll.create({
    empName,
    empId,
    basicSalary,
    overtime,
    bonus,
    totoalEarnings,
    fedaralTax,
    stateTax,
    medicare,
    totalDeduction,
    netPay,
  });
  if (!payroll) {
    res.status(404);
    throw new Error("Payroll data not valid");
  }
  res.status(201).json(payroll);
});

//@desc PUT update payrolls
//@Route PUT /api/v1/tea-factory/payrolls:id
//@access public
const updatePayroll = (req, res) => {
  res.status(200).json("update payroll here");
};

//@desc DELETE  payrolls
//@Route DELETE /api/v1/tea-factory/payrolls:id
//@access public
const deletePayroll = (req, res) => {
  res.status(200).json("delete payroll");
};

module.exports = { getPayroll, getSinglePayroll, createPayroll, updatePayroll, deletePayroll };
