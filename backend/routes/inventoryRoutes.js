const express = require("express");
const { getInventoryItem, getSingleInventory, createInventory, updateInventory, deleteInventory, getquantity, currentEmployee } = require("../controllers/inventoryController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.use(validateToken);

router.route("/current").get(currentEmployee);
router.route("/count/getquantity").get(getquantity);
router.route("/").get(getInventoryItem);
router.route("/:id").get(getSingleInventory);
router.post("/", createInventory);
router.route("/:id").put(updateInventory);
router.delete("/:id", deleteInventory);

module.exports = router;
