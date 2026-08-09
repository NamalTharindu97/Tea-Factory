const asyncHandler = require("express-async-handler");
const Payroll = require("../models/payrollModel");
const Employe = require("../models/employeeModel");
const { EPF_EMPLOYEE_RATE, EPF_EMPLOYER_RATE, ETF_RATE, computeApit, round2 } = require("../config/payrollConfig");

const num = (v) => {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
};

const validPeriod = (p) => /^\d{4}-(0[1-9]|1[0-2])$/.test(p || "");

// Pure server-side payroll math. The client never supplies totals.
const computePayroll = (employee, input) => {
  const basicSalary = round2(input.basicSalary !== undefined && input.basicSalary !== "" ? num(input.basicSalary) : employee.basicSalary);
  const overtimeHours = num(input.overtimeHours);
  const overtimeRate = num(input.overtimeRate);
  const overtime = round2(overtimeHours * overtimeRate);
  const allowances = num(input.allowances);
  const bonus = num(input.bonus);
  const loanDeduction = num(input.loanDeduction);

  const totalEarnings = round2(basicSalary + overtime + allowances + bonus);
  const epfEmployee = round2(basicSalary * EPF_EMPLOYEE_RATE);
  const epfEmployer = round2(basicSalary * EPF_EMPLOYER_RATE);
  const etf = round2(basicSalary * ETF_RATE);
  const taxable = Math.max(0, totalEarnings - epfEmployee);
  const apitTax = computeApit(taxable);
  const totalDeduction = round2(epfEmployee + apitTax + loanDeduction);
  const netPay = round2(totalEarnings - totalDeduction);

  return {
    basicSalary,
    overtimeHours: round2(overtimeHours),
    overtimeRate: round2(overtimeRate),
    overtime,
    allowances,
    bonus,
    epfEmployee,
    epfEmployer,
    etf,
    apitTax,
    loanDeduction,
    totalEarnings,
    totalDeduction,
    netPay,
    taxable,
  };
};

const findEmployee = async (identifier) => {
  if (!identifier) return null;
  const byId = await Employe.findById(identifier);
  if (byId) return byId;
  return Employe.findOne({ employeeId: String(identifier).trim().toUpperCase() });
};

//@desc GET all payroll (optional ?period=&status=)
//@Route GET /api/v1/tea-factory/payrolls/
//@access HR Manager
const getPayroll = asyncHandler(async (req, res) => {
  const { period, status } = req.query;
  const filter = {};
  if (period) {
    if (!validPeriod(period)) {
      res.status(400);
      throw new Error("period must be in YYYY-MM format");
    }
    filter.period = period;
  }
  if (status) filter.status = status;
  const payrolls = await Payroll.find(filter).sort({ createdAt: -1 }).populate("employee", "employeeId name department");
  res.status(200).json(payrolls);
});

//@desc GET Single payroll
//@Route GET /api/v1/tea-factory/payrolls/:id
//@access HR Manager
const getSinglePayroll = asyncHandler(async (req, res) => {
  const payroll = await Payroll.findById(req.params.id).populate("employee", "employeeId name department");
  if (!payroll) {
    res.status(404);
    throw new Error("Payroll Not Found");
  }
  res.status(200).json(payroll);
});

//@desc POST preview computed pay slip (no save)
//@Route POST /api/v1/tea-factory/payrolls/preview
//@access HR Manager
const previewPayroll = asyncHandler(async (req, res) => {
  const { employeeId, period, ...input } = req.body;
  if (!employeeId) {
    res.status(400);
    throw new Error("employeeId is required");
  }
  if (!validPeriod(period)) {
    res.status(400);
    throw new Error("period must be in YYYY-MM format");
  }
  const employee = await findEmployee(employeeId);
  if (!employee) {
    res.status(404);
    throw new Error("Employee Not Found");
  }
  const computed = computePayroll(employee, input);
  res.status(200).json({ employee: employee._id, employeeName: employee.name, employeeId: employee.employeeId, period, ...computed });
});

//@desc POST create new payroll
//@Route POST /api/v1/tea-factory/payrolls
//@access HR Manager
const createPayroll = asyncHandler(async (req, res) => {
  const { employeeId, period, ...input } = req.body;
  if (!employeeId || !validPeriod(period)) {
    res.status(400);
    throw new Error("employeeId and a valid period (YYYY-MM) are required");
  }
  const employee = await findEmployee(employeeId);
  if (!employee) {
    res.status(404);
    throw new Error("Employee Not Found");
  }
  if (employee.status === "terminated") {
    res.status(400);
    throw new Error("Cannot create a pay slip for a terminated employee");
  }
  const existing = await Payroll.findOne({ employee: employee._id, period });
  if (existing) {
    res.status(409);
    throw new Error(`Pay slip already exists for ${employee.name} in ${period}`);
  }
  const computed = computePayroll(employee, input);
  const payroll = await Payroll.create({
    employee: employee._id,
    employeeName: employee.name,
    period,
    status: input.status === "paid" ? "paid" : "pending",
    paidOn: input.status === "paid" ? Date.now() : undefined,
    ...computed,
  });
  res.status(201).json(payroll);
});

//@desc PUT update payroll (recomputed server-side)
//@Route PUT /api/v1/tea-factory/payrolls/:id
//@access HR Manager
const updatePayroll = asyncHandler(async (req, res) => {
  const payroll = await Payroll.findById(req.params.id);
  if (!payroll) {
    res.status(404);
    throw new Error("This Payroll Not Found");
  }
  const employee = await Employe.findById(payroll.employee);
  const input = { ...payroll.toObject(), ...req.body };
  const computed = computePayroll(employee, input);
  const status = req.body.status === "paid" ? "paid" : req.body.status === "pending" ? "pending" : payroll.status;
  const newPayroll = await Payroll.findByIdAndUpdate(
    req.params.id,
    { ...computed, period: req.body.period || payroll.period, status, paidOn: status === "paid" ? payroll.paidOn || Date.now() : undefined },
    { new: true, runValidators: true }
  );
  res.status(200).json(newPayroll);
});

//@desc DELETE payroll
//@Route DELETE /api/v1/tea-factory/payrolls/:id
//@access HR Manager
const deletePayroll = asyncHandler(async (req, res) => {
  const payroll = await Payroll.findById(req.params.id);
  if (!payroll) {
    res.status(404);
    throw new Error("Payroll Not Found");
  }
  const deleted = await Payroll.findByIdAndDelete(req.params.id);
  res.status(200).json(deleted);
});

//@desc GET monthly net pay within a year
//@Route GET /api/v1/tea-factory/payrolls/totalNetPay?year=2026
//@access HR Manager
const getMonthlyEmployeeNetPay = asyncHandler(async (req, res) => {
  const year = Number(req.query.year) || new Date().getFullYear();
  const monthlyNetPay = await Payroll.aggregate([
    { $match: { period: { $regex: `^${year}-` } } },
    { $group: { _id: { $month: { $dateFromString: { dateString: { $concat: ["$period", "-01"] } } } }, totalNetPay: { $sum: "$netPay" } } },
    { $sort: { _id: 1 } },
  ]);
  res.status(200).json(monthlyNetPay);
});

//@desc GET yearly net pay total
//@Route GET /api/v1/tea-factory/payrolls/year/totalNetPay?year=2026
//@access HR Manager
const getYearlyEmployeeNetPay = asyncHandler(async (req, res) => {
  const year = Number(req.query.year) || new Date().getFullYear();
  const totalNetPay = await Payroll.aggregate([
    { $match: { period: { $regex: `^${year}-` } } },
    { $group: { _id: null, totalNetPay: { $sum: "$netPay" } } },
  ]);
  res.status(200).json(totalNetPay[0] || { totalNetPay: 0 });
});

//@desc GET payroll count
//@Route GET /api/v1/tea-factory/payrolls/count/payroll
//@access HR Manager
const getPayrollCount = asyncHandler(async (req, res) => {
  const payrollCount = await Payroll.countDocuments();
  res.status(200).json(payrollCount);
});

//@desc GET total deductions
//@Route GET /api/v1/tea-factory/payrolls/count/totalTax
//@access HR Manager
const getTotalTax = asyncHandler(async (req, res) => {
  const totalTax = await Payroll.aggregate([{ $group: { _id: null, totalTax: { $sum: "$totalDeduction" } } }]);
  res.status(200).json(totalTax[0] || { totalTax: 0 });
});

//@desc GET total gross payments
//@Route GET /api/v1/tea-factory/payrolls/count/totalPayment
//@access HR Manager
const getTotalPayment = asyncHandler(async (req, res) => {
  const totalPay = await Payroll.aggregate([{ $group: { _id: null, totalPay: { $sum: "$totalEarnings" } } }]);
  res.status(200).json(totalPay[0] || { totalPay: 0 });
});

//@desc GET latest payrolls
//@Route GET /api/v1/tea-factory/payrolls/count/Lastest/Payroll
//@access HR Manager
const getLastestPayroll = asyncHandler(async (req, res) => {
  const recentPayroll = await Payroll.find({}, { employeeName: 1, employee: 1, netPay: 1, period: 1, createdAt: 1 }).sort({ createdAt: -1 }).limit(5);
  const formattedPayroll = recentPayroll.map((payroll) => {
    const date = payroll.period || new Date(payroll.createdAt).toISOString().slice(0, 7);
    return {
      empName: payroll.employeeName,
      empId: payroll.employee,
      netPay: payroll.netPay,
      createdAt: date,
    };
  });
  res.status(200).json(formattedPayroll);
});

module.exports = {
  getPayroll,
  getSinglePayroll,
  previewPayroll,
  createPayroll,
  updatePayroll,
  deletePayroll,
  getMonthlyEmployeeNetPay,
  getYearlyEmployeeNetPay,
  getPayrollCount,
  getTotalTax,
  getTotalPayment,
  getLastestPayroll,
  computePayroll,
};
