const mongoose = require("mongoose");
const Inventory = require("../models/inventoryModel");

beforeAll(async () => {
  await mongoose.connect(process.env.CONNECTION_STRING);
  await Inventory.deleteMany({});
});

afterAll(async () => {
  await Inventory.deleteMany({});
  await mongoose.disconnect();
});

describe("Inventory CRUD", () => {
  const item = {
    Id: "INV-100",
    name: "Tea Leaves",
    description: "Fresh tea leaves",
    quantity: 100,
    location: "Warehouse A",
    inTime: "10:00",
    outTime: "",
    supplier: "Test Supplier",
  };

  it("should create an inventory item", async () => {
    const created = await Inventory.create(item);
    expect(created).toHaveProperty("name", "Tea Leaves");
  });

  it("should return all inventory", async () => {
    const inventories = await Inventory.find();
    expect(inventories).toHaveLength(1);
  });

  it("should return a single item by id", async () => {
    const testItem = await Inventory.findOne({ Id: "INV-100" });
    const inventory = await Inventory.findById(testItem._id);
    expect(inventory).toHaveProperty("name", "Tea Leaves");
  });

  it("should return null if item not found", async () => {
    const inventory = await Inventory.findById("64677989f12048fa998ad2de");
    expect(inventory).toBeNull();
  });

  it("should update an inventory item", async () => {
    const testItem = await Inventory.findOne({ Id: "INV-100" });
    const updated = await Inventory.findByIdAndUpdate(testItem._id, { quantity: 500 }, { new: true });
    expect(updated).toHaveProperty("quantity", 500);
  });

  it("should delete an inventory item", async () => {
    const deleted = await Inventory.findOneAndDelete({ Id: "INV-100" });
    expect(deleted).toHaveProperty("name", "Tea Leaves");
  });
});
