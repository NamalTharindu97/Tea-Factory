const express = require("express");
const { getPayroll, getSinglePayroll, createPayroll, updatePayroll, deletePayroll, getMonthlyEmployeeNetPay, getYearlyEmployeeNetPay } = require("../controllers/payrollController");
const router = express.Router();

router.route("/year/totalNetPay").get(getYearlyEmployeeNetPay);
router.route("/totalNetPay").get(getMonthlyEmployeeNetPay);
router.route("/").get(getPayroll);
router.route("/:id").get(getSinglePayroll);
router.route("/").post(createPayroll);
router.route("/:id").put(updatePayroll);
router.route("/:id").delete(deletePayroll);

module.exports = router;
