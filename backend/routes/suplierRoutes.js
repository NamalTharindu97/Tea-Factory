const express = require("express");
const router = express.Router();
const { getSuplier, getSingleSuplier, createSuplier, updateSuplier, deleteSuplier,getsupplierCount, getItemCount } = require("../controllers/suplierController");


router.route("/").get(getSuplier);
router.route("/:id").get(getSingleSuplier);
router.route("/").post(createSuplier);
router.route("/:id").put(updateSuplier);
router.route("/:id").delete(deleteSuplier);
router.route("/count/supplier").get(getsupplierCount);
router.route("/count/item").get(getItemCount);





module.exports = router;



