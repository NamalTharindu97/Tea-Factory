const express = require("express");
const {
  getPayroll,
  getSinglePayroll,
  previewPayroll,
  createPayroll,
  updatePayroll,
  deletePayroll,
  getMonthlyEmployeeNetPay,
  getYearlyEmployeeNetPay,
  getPayrollCount,
  getTotalTax,
  getTotalPayment,
  getLastestPayroll,
} = require("../controllers/payrollController");
const validateToken = require("../middleware/validateTokenHandler");
const requireRole = require("../middleware/requireRole");
const router = express.Router();

// Payroll management is HR-only
router.use(validateToken, requireRole("HR Manager"));

router.route("/count/Lastest/Payroll").get(getLastestPayroll);
router.route("/count/totalPayment").get(getTotalPayment);
router.route("/count/totalTax").get(getTotalTax);
router.route("/count/payroll").get(getPayrollCount);
router.route("/year/totalNetPay").get(getYearlyEmployeeNetPay);
router.route("/totalNetPay").get(getMonthlyEmployeeNetPay);
router.route("/preview").post(previewPayroll);
router.route("/").get(getPayroll);
router.route("/:id").get(getSinglePayroll);
router.route("/").post(createPayroll);
router.route("/:id").put(updatePayroll);
router.route("/:id").delete(deletePayroll);

module.exports = router;
