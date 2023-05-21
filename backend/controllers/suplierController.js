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
    throw new Error("supplier is not coming");
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
    throw new Error("Suplier Not Found");
  }
  const newSuplier = await Suplier.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(suplier);
});

const deleteSuplier = asyncHandler(async (req, res) => {
  const suplier = await Suplier.findById(req.params.id);
  if (!suplier) {
    res.status(404);
    throw new Error("suplier Not Found");
  }
  const deleteSuplier = await Suplier.findByIdAndDelete(req.params.id);
  res.status(200).json(deleteSuplier);
});

module.exports = {
  getSuplier,
  getSingleSuplier,
  createSuplier,
  updateSuplier,
  deleteSuplier,
};
