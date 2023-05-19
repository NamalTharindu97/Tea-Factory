const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add the employee name"],
      unique: [true, "this name already taken"],
    },
    email: {
      type: String,
      required: [true, "please enter email address"],
    },
    phone: {
      type: String,
      required: [true, "please enter phone number"],
    },
    gender: {
      type: String,
      required: [true, "please enter gender"],
    },
    age: {
      type: String,
      required: [true, "enter age value"],
    },
    role: {
      type: String,
      required: [true, "please enter role"],
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
