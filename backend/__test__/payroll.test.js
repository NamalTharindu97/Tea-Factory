const Payroll = require("../models/payrollModel");
const app = require("../server"); // Import the app from server.js

describe("getPayroll", () => {
  it("should return all payrolls", async () => {
    const payrolls = await Payroll.find();
    expect(payrolls).toHaveLength(9);
  });
});

describe("createPayroll", () => {
  it("should create a new payroll", async () => {
    const payroll = {
      empName: "Kamal",
      empId: "Emp-5",
      basicSalary: 50000,
      overtime: 10000,
      bonus: 5000,
      totoalEarnings: 65000,
      fedaralTax: 1000,
      stateTax: 1000,
      medicare: 1000,
      totalDeduction: 3000,
      netPay: 62000,
    };

    try {
      const createdPayroll = await Payroll.create(payroll);
      expect(createdPayroll).toHaveProperty("empName", "Kamal");
    } catch (error) {
      expect(error.status).toBe(400);
    }
  });
});

describe("getSinglePayroll", () => {
  it("should return a single payroll by id", async () => {
    const testPayroll = await Payroll.findOne({ empName: "Kamal" });
    const testPayrollID = testPayroll._id;

    const payroll = await Payroll.findById(testPayrollID);
    expect(payroll).toHaveProperty("empName", "Kamal");
  });

  it("should return 404 if payroll is not found", async () => {
    const payroll = await Payroll.findById("645245aafa72385acd6f5c45");
    expect(payroll).toBeNull();
  });
});

describe("updatePayroll", () => {
  it("should update a payroll", async () => {
    const payroll = {
      empName: "Kamal",
      empId: "Test_1", //updated
      basicSalary: 70000, //updated
      overtime: 10000,
      bonus: 5000,
      totoalEarnings: 65000,
      fedaralTax: 1000,
      stateTax: 1000,
      medicare: 1000,
      totalDeduction: 3000,
      netPay: 62000,
    };

    const testPayroll = await Payroll.findOne({ empName: "Kamal" });
    const testPayrollID = testPayroll._id;

    const updatedPayroll = await Payroll.findByIdAndUpdate(testPayrollID, payroll, {
      new: true,
    });
    expect(updatedPayroll).toHaveProperty("empId", "Test_1");
    expect(updatedPayroll).toHaveProperty("basicSalary", 70000);
  });

  it("should return 400 if payroll is not found", async () => {
    const payroll = {
      empName: "Kamal",
      empId: "Emp-6", //updated
      basicSalary: 50000,
      overtime: 10000,
      bonus: 5000,
      totoalEarnings: 65000,
      fedaralTax: 1000,
      stateTax: 1000,
      medicare: 1000,
      totalDeduction: 3000,
      netPay: 62000,
    };

    const updatedPayroll = await Payroll.findByIdAndUpdate("645245aafa72385acd6f5c42", payroll);
  });
});

describe("deletePayroll", () => {
  it("should delete a payroll", async () => {
    const payroll = await Payroll.findOne({ empName: "Kamal" });
    const payrollId = payroll._id;

    const deletedPayroll = await Payroll.findByIdAndDelete(payrollId);
    expect(deletedPayroll).toBeTruthy();
  });

  it("should return 404 if payroll is not found", async () => {
    const deletedPayroll = await Payroll.findByIdAndDelete("647086937a12fcb3fd3440d5");
    expect(deletedPayroll).toBeNull();
  });
});
