const mongoose = require("mongoose");

const inventorySchema = mongoose.Schema(
  {
    Id: {
      type: String,
      required: [true, "please add the inventory id"],
      unique: [true, "this id already taken"],
    },
    name: {
      type: String,
      required: [true, "please add the inventory name"],
    },
    description: {
      type: String,
      required: [true, "please enter description"],
    },
    quantity: {
      type: String,
      required: [true, "please enter quantity"],
    },
    location: {
      type: String,
      required: [true, "please enter location"],
    },
    inTime: {
      type: String,
      required: [true, "enter inTime"],
    },
    outTime: {
      type: String,
      required: [true, "please enter outTime"],
    },
    supplier: {
      type: String,
      required: [true, "please enter supplier name"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Inventory", inventorySchema);
