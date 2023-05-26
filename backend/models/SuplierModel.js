const mongoose = require("mongoose");

const suplierSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    item: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    bank: {
      type: String,
    },
    bankNo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Suplier", suplierSchema);
