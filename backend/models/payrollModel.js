const mongoose = require("mongoose");

const payrollScheema = mongoose.Schema(
  {
    empName: {
      type: String,
      required: [true, "please add the employee name"],
    },

    empId: {
      type: String,
      required: [true, "please add the employee id"],
    },

    basicSalary: {
      type: Number,
      required: [true, "please add the basicSalary"],
    },

    overtime: {
      type: Number,
      required: [true, "please add the overtime"],
    },

    bonus: {
      type: Number,
      required: [true, "please add the bonus"],
    },

    totoalEarnings: {
      type: Number,
      required: [true, "please add the totoalEarnings"],
    },

    fedaralTax: {
      type: Number,
      required: [true, "please add the fedaralTax"],
    },

    stateTax: {
      type: Number,
      required: [true, "please add the stateTax"],
    },

    medicare: {
      type: Number,
      required: [true, "please add the medicare"],
    },

    totalDeduction: {
      type: Number,
      required: [true, "please add the totalDeduction"],
    },

    netPay: {
      type: Number,
      required: [true, "please add the netPay"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payroll", payrollScheema);
