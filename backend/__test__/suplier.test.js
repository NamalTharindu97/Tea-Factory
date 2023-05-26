const Supplier = require("../models/SuplierModel");
const mongoose = require("mongoose");
require("dotenv").config();

beforeAll(async () => {
  await mongoose.connect(process.env.CONNECTION_STRING);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("createProduction", () => {
  it("should create a new Employee", async () => {
    const suplier = {
      name: "Test Supplier",
      item: "Tea",
      address: "No 123, Colombo",
      phone: "0772417049",
      email: "Supplier@gmail.com",
      bank: "BOC",
      bankNo: "123456789",
    };

    try {
      const createdSupplier = await Supplier.create(suplier);
      expect(createdSupplier).toHaveProperty("name", "Test Supplier");
    } catch (error) {
      expect(error.status).toBe(400);
    }
  });
});

describe("getSingleSupplier", () => {
  it("should return a single Supplier by id", async () => {
    const testSupplier = await Supplier.findOne({ name: "Test Supplier" });
    const testSupplierID = testSupplier._id;

    const supplier = await Supplier.findById(testSupplierID);
    expect(supplier).toHaveProperty("name", "Test Supplier");
  });

  it("should return 404 if payroll is not found", async () => {
    const supplier = await Supplier.findById("6451c5a0bf23f742e7e1f5de");
    expect(supplier).toBeNull();
  });
});

describe("updateSupplier", () => {
  it("should update a Supplier", async () => {
    const supplier = {
      name: "Test Supplier",
      item: "Fuel", //updated
      address: "No 123, Colombo",
      phone: "0772417049",
      email: "Supplier@gmail.com",
      bank: "BOC",
      bankNo: "123456789",
    };
    const testSupplier = await Supplier.findOne({ name: "Test Supplier" });
    const testSupplierID = testSupplier._id;

    const updatedSupplier = await Supplier.findByIdAndUpdate(testSupplierID, supplier, {
      new: true,
    });
    expect(updatedSupplier).toHaveProperty("item", "Fuel");
  });
});

describe("deleteSupplier", () => {
  it("should delete a Supplier", async () => {
    const testSupplier = await Supplier.findOne({ name: "Test Supplier" });
    const testSupplierID = testSupplier._id;

    const deletedSupplier = await Supplier.findByIdAndDelete(testSupplierID);
    expect(deletedSupplier).toBeTruthy();
  });

  it("should return 404 if payroll is not found", async () => {
    const deletedSupplier = await Supplier.findByIdAndDelete("6451c5a0bf23f742e7e1f5de");
    expect(deletedSupplier).toBeNull();
  });
});
