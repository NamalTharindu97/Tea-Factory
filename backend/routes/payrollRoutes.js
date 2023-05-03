const express = require("express");
const { getPayroll, getSinglePayroll, createPayroll, updatePayroll, deletePayroll } = require("../controllers/payrollController");
const router = express.Router();

router.route("/").get(getPayroll);
router.route("/:id").get(getSinglePayroll);
router.route("/").post(createPayroll);
router.route("/:id").put(updatePayroll);
router.route("/:id").delete(deletePayroll);

module.exports = router;
