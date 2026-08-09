const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add the employee name"],
    },
    employeeId: {
      type: String,
      required: [true, "please add the employee id"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "please enter email address"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "please enter phone number"],
    },
    nic: {
      type: String,
    },
    gender: {
      type: String,
      required: [true, "please enter gender"],
    },
    age: {
      type: Number,
      required: [true, "enter age value"],
    },
    role: {
      type: String,
      required: [true, "please enter role"],
    },
    department: {
      type: String,
      default: "General",
    },
    position: {
      type: String,
      default: "",
    },
    basicSalary: {
      type: Number,
      default: 0,
      min: [0, "salary cannot be negative"],
    },
    epfNo: {
      type: String,
      default: "",
    },
    bankAccount: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    hireDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["active", "terminated"],
      default: "active",
    },
    password: {
      type: String,
      required: [true, "please enter password"],
    },
    img: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employee", employeeSchema);
