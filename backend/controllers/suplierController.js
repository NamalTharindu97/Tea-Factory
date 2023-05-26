const asyncHandler = require("express-async-handler");
const Suplier = require("../models/SuplierModel");

const getSuplier = asyncHandler(async (req, res) => {
  const supliers = await Suplier.find();
  res.status(200).json(supliers);
});

const getSingleSuplier = asyncHandler(async (req, res) => {
  const suplier = await Suplier.findById(req.params.id);
  if (!suplier) {
    res.status(404);
    throw new Error("Supplier is not found");
  }
  res.status(200).json(suplier);
});

const createSuplier = asyncHandler(async (req, res) => {
  const { name, item, address, phone, email, bank, bankNo } = req.body;
  if (!name || !item || !address || !phone || !email || !bank || !bankNo) {
    res.status(400);
    throw new Error("all fields are mandotory");
  }
  const suplier = await Suplier.create({
    name,
    item,
    address,
    phone,
    email,
    bank,
    bankNo,
  });
  if (!suplier) {
    res.status(404);
    throw new Error("Employee data not valid");
  }
  res.status(201).json(suplier);
});

const updateSuplier = asyncHandler(async (req, res) => {
  const suplier = await Suplier.findById(req.params.id);
  if (!suplier) {
    res.status(404);
    throw new Error("Supplier not found");
  }
  const updatedSuplier = await Suplier.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedSuplier);
});

const deleteSuplier = asyncHandler(async (req, res) => {
  const suplier = await Suplier.findById(req.params.id);
  if (!suplier) {
    res.status(404);
    throw new Error("Supplier not found");
  }
  const deletedSuplier = await Suplier.findByIdAndDelete(req.params.id);
  res.status(200).json(deletedSuplier);
});
const getsupplierCount = asyncHandler(async (req, res) => {
  const supplierCount = await Suplier.countDocuments();
  if (!supplierCount) {
    res.status(404);
    throw new Error("Supplier count not parsing");
  }
  res.status(200).json(supplierCount);
});
const getItemCount = asyncHandler(async (req, res) => {
  const itemCounts = {};

  const teaCount = await Suplier.countDocuments({ item: 'tea' });
  itemCounts.tea = teaCount;

  const fuelCount = await Suplier.countDocuments({ item: 'fuel' });
  itemCounts.fuel = fuelCount;

  const chemicalCount = await Suplier.countDocuments({ item: 'chemical' });
  itemCounts.chemical = chemicalCount;

  res.status(200).json(itemCounts);
});




module.exports = {
  getSuplier,
  getSingleSuplier,
  createSuplier,
  updateSuplier,
  deleteSuplier,
  getsupplierCount,
  getItemCount,



};
