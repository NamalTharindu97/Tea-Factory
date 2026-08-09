const mongoose = require("mongoose");

const payrollScheema = mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: [true, "please link the payroll to an employee"],
      index: true,
    },
    employeeName: {
      type: String,
      required: [true, "please add the employee name"],
    },
    period: {
      type: String, // "YYYY-MM" pay month
      required: [true, "please add the pay period"],
    },
    basicSalary: {
      type: Number,
      required: [true, "please add the basicSalary"],
    },
    overtimeHours: {
      type: Number,
      default: 0,
    },
    overtimeRate: {
      type: Number,
      default: 0,
    },
    overtime: {
      type: Number,
      default: 0,
    },
    allowances: {
      type: Number,
      default: 0,
    },
    bonus: {
      type: Number,
      default: 0,
    },
    epfEmployee: {
      type: Number,
      default: 0,
    },
    epfEmployer: {
      type: Number,
      default: 0,
    },
    etf: {
      type: Number,
      default: 0,
    },
    apitTax: {
      type: Number,
      default: 0,
    },
    loanDeduction: {
      type: Number,
      default: 0,
    },
    totalEarnings: {
      type: Number,
      required: [true, "please add the totoalEarnings"],
    },
    totalDeduction: {
      type: Number,
      required: [true, "please add the totalDeduction"],
    },
    netPay: {
      type: Number,
      required: [true, "please add the netPay"],
    },
    status: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    paidOn: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// One pay slip per employee per month.
payrollScheema.index({ employee: 1, period: 1 }, { unique: true });

module.exports = mongoose.model("Payroll", payrollScheema);
