const mongoose = require("mongoose");
const Employe = require("../models/employeeModel");

beforeAll(async () => {
  await mongoose.connect(process.env.CONNECTION_STRING);
  await Employe.deleteMany({});
});

afterAll(async () => {
  await Employe.deleteMany({});
  await mongoose.disconnect();
});

describe("Employee CRUD", () => {
  const employee = {
    name: "Test User",
    employeeId: "E999",
    email: "TestUser@gmail.com",
    phone: "0772417049",
    gender: "male",
    age: 25,
    role: "HR Manager",
    password: "12345",
  };

  it("should create a new employee", async () => {
    const created = await Employe.create(employee);
    expect(created).toHaveProperty("name", "Test User");
    expect(created).toHaveProperty("employeeId", "E999");
    expect(created.age).toBe(25);
    expect(created.status).toBe("active");
  });

  it("should reject duplicate employee ids", async () => {
    await expect(Employe.create(employee)).rejects.toThrow();
  });

  it("should allow duplicate employee names (name is no longer unique)", async () => {
    const dup = await Employe.create({ ...employee, employeeId: "E998", email: "dup@gmail.com" });
    expect(dup).toHaveProperty("name", "Test User");
  });

  it("should return all employees", async () => {
    const employees = await Employe.find();
    expect(employees).toHaveLength(2);
  });

  it("should return a single employee by id", async () => {
    const testUser = await Employe.findOne({ name: "Test User" });
    const employe = await Employe.findById(testUser._id);
    expect(employe).toHaveProperty("name", "Test User");
  });

  it("should return null for a missing employee", async () => {
    const employe = await Employe.findById("64677989f12048fa998ad2de");
    expect(employe).toBeNull();
  });

  it("should update an employee", async () => {
    const updated = await Employe.findOneAndUpdate({ employeeId: "E999" }, { position: "Senior Manager" }, { new: true });
    expect(updated).toHaveProperty("position", "Senior Manager");
  });

  it("should delete an employee", async () => {
    const deleted = await Employe.findOneAndDelete({ employeeId: "E999" });
    expect(deleted).toHaveProperty("name", "Test User");
  });
});
