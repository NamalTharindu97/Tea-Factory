const Production = require("../models/productionModel");
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
    const production = {
      ProdutionID: "P001-2023",
      description: "This is a test production",
      startDate: "2021-09-01",
      endDate: "2021-09-30",
      status: "Completed",
      teaType: "Black Tea",
      batchNumber: "B001",
    };

    try {
      const createdProduction = await Production.create(production);
      expect(createdProduction).toHaveProperty("ProdutionID", "P001-2023");
    } catch (error) {
      expect(error.status).toBe(400);
    }
  });
});

describe("getSingleProduction", () => {
  it("should return a single Production by id", async () => {
    const testProduction = await Production.findOne({ ProdutionID: "P001-2023" });
    const testProductionID = testProduction._id;

    const production = await Production.findById(testProductionID);
    expect(production).toHaveProperty("ProdutionID", "P001-2023");
  });

  it("should return 404 if payroll is not found", async () => {
    const payroll = await Production.findById("6451c5a0bf23f742e7e1f5de");
    expect(payroll).toBeNull();
  });
});

describe("updateProduction", () => {
  it("should update a Production", async () => {
    const production = {
      ProdutionID: "P001-2023",
      description: "This is a test production and now it updated", //updated
      startDate: "2021-09-01",
      endDate: "2021-09-30",
      status: "Completed",
      teaType: "Green Tea", //updated
      batchNumber: "B001",
    };
    const testProduction = await Production.findOne({ ProdutionID: "P001-2023" });
    const testProductionID = testProduction._id;

    const updatedProduction = await Production.findByIdAndUpdate(testProductionID, production, {
      new: true,
    });
    expect(updatedProduction).toHaveProperty("teaType", "Green Tea");
  });
});

describe("deleteProduction", () => {
  it("should delete a Production", async () => {
    const testProduction = await Production.findOne({ ProdutionID: "P001-2023" });
    const testProductionID = testProduction._id;

    const deletedProduction = await Production.findByIdAndDelete(testProductionID);
    expect(deletedProduction).toBeTruthy();
  });

  it("should return 404 if payroll is not found", async () => {
    const deletedProduction = await Production.findByIdAndDelete("6451c5a0bf23f742e7e1f5de");
    expect(deletedProduction).toBeNull();
  });
});
