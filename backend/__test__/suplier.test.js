const mongoose = require("mongoose");
const Suplier = require("../models/SuplierModel");

beforeAll(async () => {
  await mongoose.connect(process.env.CONNECTION_STRING);
  await Suplier.deleteMany({});
});

afterAll(async () => {
  await Suplier.deleteMany({});
  await mongoose.disconnect();
});

describe("Suplier CRUD", () => {
  const suplier = {
    name: "Test Supplier",
    item: "Tea",
    address: "Kandy",
    phone: "0772417049",
    email: "testsupplier@example.com",
    bank: "BOC",
    bankNo: "123456789",
  };

  it("should create a new suplier", async () => {
    const created = await Suplier.create(suplier);
    expect(created).toHaveProperty("name", "Test Supplier");
  });

  it("should return all supliers", async () => {
    const supliers = await Suplier.find();
    expect(supliers).toHaveLength(1);
  });

  it("should return a single suplier by id", async () => {
    const testSuplier = await Suplier.findOne({ name: "Test Supplier" });
    const found = await Suplier.findById(testSuplier._id);
    expect(found).toHaveProperty("name", "Test Supplier");
  });

  it("should update a suplier", async () => {
    const updated = await Suplier.findOneAndUpdate({ name: "Test Supplier" }, { name: "Test Supplier Updated" }, { new: true });
    expect(updated).toHaveProperty("name", "Test Supplier Updated");
  });

  it("should delete a suplier", async () => {
    const deleted = await Suplier.findOneAndDelete({ name: "Test Supplier Updated" });
    expect(deleted).toHaveProperty("name", "Test Supplier Updated");
  });
});
