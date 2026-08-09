const mongoose = require("mongoose");
const { detectAnomalies, attritionRisk, answerQuery } = require("../services/aiService");

const emp = (id, extra = {}) => ({
  _id: id,
  name: `Emp ${id}`,
  employeeId: `E${id}`,
  role: "Production Worker",
  age: 30,
  gender: "male",
  department: "Production",
  status: "active",
  ...extra,
});

const pay = (empId, period, netPay, extra = {}) => ({
  employee: empId,
  employeeName: `Emp ${empId}`,
  period,
  netPay,
  overtime: 0,
  bonus: 0,
  status: "paid",
  ...extra,
});

describe("AI heuristic service", () => {
  it("should detect anomalies via z-score", () => {
    const employees = [emp(1)];
    const payrolls = [
      pay(1, "2026-01", 50000, { overtime: 10, bonus: 0 }),
      pay(1, "2026-02", 51000, { overtime: 12, bonus: 0 }),
      pay(1, "2026-03", 49000, { overtime: 9, bonus: 0 }),
      pay(1, "2026-04", 52000, { overtime: 200, bonus: 0 }), // outlier overtime
    ];
    const flags = detectAnomalies(employees, payrolls, 1.5);
    expect(flags.length).toBeGreaterThan(0);
    expect(flags[0].employeeName).toBe("Emp 1");
    expect(flags[0].field).toBe("overtime");
  });

  it("should score attrition risk higher for recently hired young production workers", () => {
    const recent = emp(2, { hireDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), age: 22 });
    const veteran = emp(3, { hireDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 10), age: 45, role: "HR Manager" });
    const risks = attritionRisk([recent, veteran], []);
    const recentRisk = risks.find((r) => r.employeeId === "E2");
    const veteranRisk = risks.find((r) => r.employeeId === "E3");
    expect(recentRisk.riskScore).toBeGreaterThan(veteranRisk.riskScore);
  });

  it("should answer count questions", () => {
    const employees = [emp(1), emp(2, { role: "HR Manager", gender: "female" })];
    const result = answerQuery(employees, [], "how many employees do we have?");
    expect(result.answer).toContain("2");
  });

  it("should compute total net pay for a year", () => {
    const employees = [emp(1)];
    const payrolls = [pay(1, "2026-01", 50000), pay(1, "2026-02", 60000), pay(1, "2025-12", 90000)];
    const result = answerQuery(employees, payrolls, "total net pay for 2026");
    expect(result.answer).toContain("LKR 110,000");
  });

  it("should provide a monthly series for charts", () => {
    const employees = [emp(1)];
    const payrolls = [pay(1, "2026-01", 50000), pay(1, "2026-02", 60000)];
    const result = answerQuery(employees, payrolls, "net pay by month for 2026");
    expect(result.series).toBeDefined();
    expect(result.series.type).toBe("line");
    expect(result.series.data[0]).toBe(50000);
    expect(result.series.data[1]).toBe(60000);
  });

  it("should fall back gracefully on unknown questions", () => {
    const result = answerQuery([], [], "what is the meaning of tea?");
    expect(result.answer).toContain("couldn't understand");
  });
});
