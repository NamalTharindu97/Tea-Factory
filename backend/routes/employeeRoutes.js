const express = require("express");
const {
  getEmployee,
  getSingleEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  loginEmployee,
  currentEmployee,
  getEmpCount,
  getEmployeeCount,
  getMonthlyEmployeeCount,
  changePassword,
} = require("../controllers/employeeController");
const validateToken = require("../middleware/validateTokenHandler");
const requireRole = require("../middleware/requireRole");
const router = express.Router();

// Public routes
router.route("/login").post(loginEmployee);

// Everything below requires a valid Bearer token
router.use(validateToken);

// Any authenticated user can view/count employees and change their own password
router.route("/current").get(currentEmployee);
router.route("/genderCount").get(getEmployeeCount);
router.route("/monthlyEmployeCount").get(getMonthlyEmployeeCount);
router.route("/count").get(getEmpCount);
router.route("/password").put(changePassword);
router.route("/").get(getEmployee);
router.route("/:id").get(getSingleEmployee);

// Employee management is HR-only
router.route("/").post(requireRole("HR Manager"), createEmployee);
router.route("/:id").put(requireRole("HR Manager"), updateEmployee);
router.route("/:id").delete(requireRole("HR Manager"), deleteEmployee);

module.exports = router;
