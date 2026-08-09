const mongoose = require("mongoose");
const Production = require("../models/productionModel");

beforeAll(async () => {
  await mongoose.connect(process.env.CONNECTION_STRING);
  await Production.deleteMany({});
});

afterAll(async () => {
  await Production.deleteMany({});
  await mongoose.disconnect();
});

describe("Production CRUD", () => {
  const production = {
    ProdutionID: "P001-2023",
    description: "Test production run",
    startDate: "2023-01-01",
    endDate: "2023-01-05",
    status: "Completed",
    teaType: "Black Tea",
    batchNumber: "B-100",
  };

  it("should create a new production record", async () => {
    const created = await Production.create(production);
    expect(created).toHaveProperty("ProdutionID", "P001-2023");
  });

  it("should reject duplicate production ids", async () => {
    await expect(Production.create(production)).rejects.toThrow();
  });

  it("should return all production records", async () => {
    const records = await Production.find();
    expect(records).toHaveLength(1);
  });

  it("should return a single production record by id", async () => {
    const testRecord = await Production.findOne({ ProdutionID: "P001-2023" });
    const found = await Production.findById(testRecord._id);
    expect(found).toHaveProperty("description", "Test production run");
  });

  it("should update a production record", async () => {
    const updated = await Production.findOneAndUpdate({ ProdutionID: "P001-2023" }, { status: "In Progress" }, { new: true });
    expect(updated).toHaveProperty("status", "In Progress");
  });

  it("should delete a production record", async () => {
    const deleted = await Production.findOneAndDelete({ ProdutionID: "P001-2023" });
    expect(deleted).toHaveProperty("ProdutionID", "P001-2023");
  });
});
