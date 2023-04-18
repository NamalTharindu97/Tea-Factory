const express = require("express");
const {
  getEmployee,
  getSingleEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  loginEmployee,
  currentEmployee,
} = require("../controllers/employeeController");
const router = express.Router();

router.route("/current").get(currentEmployee);
router.route("/login").post(loginEmployee);
router.route("/").get(getEmployee);
router.route("/:id").get(getSingleEmployee);
router.route("/").post(createEmployee);
router.route("/:id").put(updateEmployee);
router.route("/:id").delete(deleteEmployee);

module.exports = router;
