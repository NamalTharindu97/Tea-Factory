const express = require("express");
const { getInventoryItem, getSingleInventory, createInventory, updateInventory, deleteInventory, getquantity, currentEmployee } = require("../controllers/inventoryController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.route("/current").get(validateToken, currentEmployee);
router.route("/").get(getInventoryItem);
router.route("/:id").get(getSingleInventory);
router.post("/" ,createInventory);
router.route("/:id").put(updateInventory);
router.delete("/:id",deleteInventory);
router.get("/count/getquantity",getquantity);

module.exports = router;
