const Employe = require("../models/employeeModel");
const mongoose = require("mongoose");
require("dotenv").config();

beforeAll(async () => {
  await mongoose.connect(process.env.CONNECTION_STRING);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("getEmployee", () => {
  it("should return all employees", async () => {
    const employees = await Employe.find();
    expect(employees).toHaveLength(13);
  });
});

describe("createEmployee", () => {
  it("should create a new Employee", async () => {
    const employe = {
      name: "Test User",
      email: "TestUser@gmail.com",
      phone: "0772417049",
      gender: "male",
      img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      age: "25",
      role: "HR Manager",
      password: "12345",
    };

    try {
      const createdEmployee = await Employe.create(employe);
      expect(createdEmployee).toHaveProperty("name", "Test User");
    } catch (error) {
      expect(error.status).toBe(400);
    }
  });
});

describe("getSingleEmploye", () => {
  it("should return a single payroll by id", async () => {
    const testUser = await Employe.findOne({ name: "Test User" });
    const testUserID = testUser._id;

    const employe = await Employe.findById(testUserID);
    expect(employe).toHaveProperty("name", "Test User");
  });

  it("should return 404 if payroll is not found", async () => {
    const payroll = await Employe.findById("64677989f12048fa998ad2de");
    expect(payroll).toBeNull();
  });
});

describe("updateEmploye", () => {
  it("should update a Employe", async () => {
    const employe = {
      name: "Test User",
      email: "TestUser@gmail.com",
      phone: "0772417049",
      gender: "male",
      img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      age: "25",
      role: "Inventory Manager", //updated
      password: "12345",
    };

    const testUser = await Employe.findOne({ name: "Test User" });
    const testUserID = testUser._id;

    const updatedEmploye = await Employe.findByIdAndUpdate(testUserID, employe, {
      new: true,
    });
    expect(updatedEmploye).toHaveProperty("role", "Inventory Manager");
  });
});

describe("deleteEmploye", () => {
  it("should delete a Employe", async () => {
    const testUser = await Employe.findOne({ name: "Test User" });
    const testUserID = testUser._id;

    const deletedEmploye = await Employe.findByIdAndDelete(testUserID);
    expect(deletedEmploye).toBeTruthy();
  });

  it("should return 404 if payroll is not found", async () => {
    const deletedEmploye = await Employe.findByIdAndDelete("646a0970e0df889ab9516322");
    expect(deletedEmploye).toBeNull();
  });
});
