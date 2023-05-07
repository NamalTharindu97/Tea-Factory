const asyncHandler = require("express-async-handler");
const Payroll = require("../models/payrollModel");

//@desc GET all payroll
//@Route GET /api/v1/tea-factory/payrolls/
//@access public
const getPayroll = asyncHandler(async (req, res) => {
  const payrolls = await Payroll.find();
  res.status(200).json(payrolls);
});

//@desc GET Single payroll
//@Route GET /api/v1/tea-factory/payrolls/:id
//@access public
const getSinglePayroll = asyncHandler(async (req, res) => {
  const payroll = await Payroll.findById(req.params.id);
  if (!payroll) {
    res.status(404);
    throw new Error("Employee Not Found");
  }
  res.status(200).json(payroll);
});

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
    throw new Error("this employee  already had payment");
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
const updatePayroll = asyncHandler(async (req, res) => {
  const payroll = await Payroll.findById(req.params.id);
  if (!payroll) {
    res.status(404);
    throw new Error("This Payroll Not Found");
  }
  const newPayroll = await Payroll.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(newPayroll);
});

//@desc DELETE  payrolls
//@Route DELETE /api/v1/tea-factory/payrolls:id
//@access public
const deletePayroll = asyncHandler(async (req, res) => {
  const payroll = await Payroll.findById(req.params.id);
  if (!payroll) {
    res.status(404);
    throw new Error("Employee Not Found");
  }
  const deletePayroll = await Payroll.findByIdAndDelete(req.params.id);
  res.status(200).json(deletePayroll);
});

//@desc GET  getMonthlyEmployeeNetPay
//@Route GET /api/v1/tea-factory/payrolls:id
//@access public
const getMonthlyEmployeeNetPay = asyncHandler(async (req, res) => {
  const monthlyNetPay = await Payroll.aggregate([
    // match documents by createdAt field
    {
      $match: {
        createdAt: {
          $gte: new Date(new Date().getFullYear(), 0, 1),
          $lte: new Date(new Date().getFullYear(), 11, 31),
        },
      },
    },
    // group the employees by month and sum their net pay
    {
      $group: {
        _id: { $month: "$createdAt" },
        totalNetPay: { $sum: "$netPay" },
      },
    },
    {
      // sort the documents by month
      $sort: { _id: 1 },
    },
  ]);

  if (!monthlyNetPay) {
    res.status(404);
    throw new Error("Monthly net pay not found");
  }

  res.status(200).json(monthlyNetPay);
});

module.exports = { getPayroll, getSinglePayroll, createPayroll, updatePayroll, deletePayroll, getMonthlyEmployeeNetPay };