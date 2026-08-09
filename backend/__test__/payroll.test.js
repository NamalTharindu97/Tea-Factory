const mongoose = require("mongoose");
const Payroll = require("../models/payrollModel");
const Employe = require("../models/employeeModel");
const { computePayroll } = require("../controllers/payrollController");

beforeAll(async () => {
  await mongoose.connect(process.env.CONNECTION_STRING);
  await Promise.all([Payroll.deleteMany({}), Employe.deleteMany({})]);
});

afterAll(async () => {
  await Promise.all([Payroll.deleteMany({}), Employe.deleteMany({})]);
  await mongoose.disconnect();
});

describe("Payroll compute logic", () => {
  const employee = {
    _id: "64677989f12048fa998ad2de",
    name: "Compute Test",
    basicSalary: 100000,
  };

  it("should compute earnings, EPF, APIT and net pay server-side", () => {
    const result = computePayroll(employee, {
      overtimeHours: 10,
      overtimeRate: 1000,
      allowances: 5000,
      bonus: 10000,
      loanDeduction: 5000,
    });
    expect(result.basicSalary).toBe(100000);
    expect(result.overtime).toBe(10000);
    expect(result.totalEarnings).toBe(125000);
    expect(result.epfEmployee).toBe(8000); // 8% of basic
    expect(result.epfEmployer).toBe(12000);
    expect(result.etf).toBe(3000);
    // taxable = 125000 - 8000 = 117000 -> below 150k relief -> APIT 0
    expect(result.apitTax).toBe(0);
    expect(result.totalDeduction).toBe(13000); // 8000 + 0 + 5000
    expect(result.netPay).toBe(112000);
  });

  it("should apply progressive APIT above the relief threshold", () => {
    const result = computePayroll(employee, { basicSalary: 500000 });
    // taxable = 500000 - 40000 = 460000
    // bands: 150k@0, 50k@6%, 50k@12%, 50k@18%, 50k@24%, 110k@30%
    expect(result.apitTax).toBe(63000);
  });

  it("should round to 2 decimal places", () => {
    const result = computePayroll(employee, { overtimeHours: 3.333, overtimeRate: 999.999, basicSalary: 1 / 3 });
    expect(result.basicSalary).toBe(0.33);
    expect(result.overtime).toBe(3333);
  });
});

describe("Payroll CRUD", () => {
  let employee;

  beforeAll(async () => {
    employee = await Employe.create({
      name: "Payroll Tester",
      employeeId: "E700",
      email: "payroll@test.com",
      phone: "0771111111",
      gender: "male",
      age: 30,
      role: "Production Worker",
      basicSalary: 50000,
      password: "12345",
    });
  });

  const base = { employee: null, period: "2026-05" };
  const withEmp = (extra = {}) => ({ ...base, employee: employee._id, ...extra });

  it("should create a new payroll linked to an employee", async () => {
    const created = await Payroll.create({
      ...withEmp(),
      employeeName: employee.name,
      basicSalary: 50000,
      overtime: 0,
      epfEmployee: 4000,
      apitTax: 0,
      totalEarnings: 50000,
      totalDeduction: 4000,
      netPay: 46000,
    });
    expect(created).toHaveProperty("employeeName", "Payroll Tester");
    expect(created.period).toBe("2026-05");
  });

  it("should enforce one pay slip per employee per period", async () => {
    await expect(
      Payroll.create({
        ...withEmp(),
        employeeName: employee.name,
        basicSalary: 50000,
        totalEarnings: 50000,
        totalDeduction: 4000,
        netPay: 46000,
      })
    ).rejects.toThrow();
  });

  it("should return all payrolls", async () => {
    const payrolls = await Payroll.find();
    expect(payrolls).toHaveLength(1);
  });

  it("should return a single payroll by id", async () => {
    const testPayroll = await Payroll.findOne({ period: "2026-05" });
    const found = await Payroll.findById(testPayroll._id);
    expect(found).toHaveProperty("employeeName", "Payroll Tester");
  });

  it("should return null if payroll is not found", async () => {
    const found = await Payroll.findById("64677989f12048fa998ad2de");
    expect(found).toBeNull();
  });

  it("should update a payroll", async () => {
    const updated = await Payroll.findOneAndUpdate({ period: "2026-05" }, { status: "paid" }, { new: true });
    expect(updated).toHaveProperty("status", "paid");
  });

  it("should delete a payroll", async () => {
    const deleted = await Payroll.findOneAndDelete({ period: "2026-05" });
    expect(deleted).toHaveProperty("employeeName", "Payroll Tester");
  });
});
