const Inventory = require("../models/inventoryModel");
const mongoose = require("mongoose");
require("dotenv").config();

beforeAll(async () => {
  await mongoose.connect(process.env.CONNECTION_STRING);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("createInventory", () => {
  it("should create a new inventory", async () => {
    const inventory = {
      Id: "I001",
      name: "Test Inventory",
      description: "This is a test inventory",
      quantity: 100,
      location: "Colombo",
      inTime: "2021-09-01",
      outTime: "2021-09-30",
      supplier: "Test Supplier",
    };

    try {
      const createdInventory = await Inventory.create(inventory);
      expect(createdInventory).toHaveProperty("Id", "I001");
    } catch (error) {
      expect(error.status).toBe(400);
    }
  });
});

describe("getSingleInventory", () => {
  it("should return a single Inventory by id", async () => {
    const testInventory = await Inventory.findOne({ name: "Test Inventory" });
    const testInventoryID = testInventory._id;

    const inventory = await Inventory.findById(testInventoryID);
    expect(inventory).toHaveProperty("name", "Test Inventory");
  });

  it("should return 404 if payroll is not found", async () => {
    const inventory = await Inventory.findById("6451c5a0bf23f742e7e1f5de");
    expect(inventory).toBeNull();
  });
});

describe("updateInventory", () => {
  it("should update a Inventory", async () => {
    const inventory = {
      Id: "I001",
      name: "Test Inventory",
      description: "This is a test inventory",
      quantity: 200, //updated
      location: "Colombo",
      inTime: "2021-09-01",
      outTime: "2021-09-30",
      supplier: "Test Supplier",
    };
    const testInventory = await Inventory.findOne({ name: "Test Inventory" });
    const testInventoryID = testInventory._id;

    const updatedInventory = await Inventory.findByIdAndUpdate(testInventoryID, inventory, {
      new: true,
    });
    expect(updatedInventory).toHaveProperty("quantity", 200);
  });
});

describe("deleteInventory", () => {
  it("should delete a Inventory", async () => {
    const testInventory = await Inventory.findOne({ name: "Test Inventory" });
    const testInventoryID = testInventory._id;

    const deletedInventory = await Inventory.findByIdAndDelete(testInventoryID);
    expect(deletedInventory).toBeTruthy();
  });

  it("should return 404 if payroll is not found", async () => {
    const deletedInventory = await Inventory.findByIdAndDelete("6451c5a0bf23f742e7e1f5de");
    expect(deletedInventory).toBeNull();
  });
});
