const asyncHandler = require("express-async-handler");
const Inventory = require("../models/inventoryModel");

//GET all Inventory
//GET - http://localhost:5000/api/v1/tea-factory/inventory/
const getInventoryItem = asyncHandler(async (req, res) => {
  const inventories = await Inventory.find();
  res.status(200).json(inventories);
});

//GET Single Inventory
//GET - http://localhost:5000/api/v1/tea-factory/inventory/:id
const getSingleInventory = async (req, res, next) => {
  try {
    const inventory = await Inventory.findById(req.params.id);
    res.status(200).json(inventory);
  } catch (err) {
    next(err);
  }
};

//Create
// POST- http://localhost:5000/api/v1/tea-factory/inventory/
const createInventory = async (req, res, next) => {
  const newInventory = new Inventory(req.body);
  try {
    const saveInventory = await newInventory.save();
    res.status(200).json(saveInventory);
  } catch (err) {
    next(err);
  }
};

//UPDATE
//PUT - http://localhost:5000/api/v1/tea-factory/inventory/:id
const updateInventory = async (req, res, next) => {
  try {
    const updateInventory = await Inventory.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updateInventory);
  } catch (err) {
    next(err);
  }
};

//DELETE  Inventory
//DELETE - http://localhost:5000/api/v1/tea-factory/inventory/:id
const deleteInventory = async (req, res, next) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.status(200).json("Inventory has been Deleted");
  } catch (err) {
    next(err);
  }
};

//GET total quntity
//http://localhost:5000/api/v1/tea-factory/inventory/getquantity
const getquantity = asyncHandler(async (req, res) => {
  const totalQty = await Inventory.aggregate([
    {
      $group: {
        _id: null,
        totalQty: { $sum: "$quantity" },
      },
    },
  ]);
  if (!totalQty) {
    res.status(404);
    throw new Error("total quantity not parsing");
  }
  res.status(200).json(totalQty[0]);
});

//GET  current  Employee
const currentEmployee = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = {
  getInventoryItem,
  getSingleInventory,
  createInventory,
  updateInventory,
  deleteInventory,
  getquantity,
  currentEmployee,
};
