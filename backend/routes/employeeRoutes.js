const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  res.status(200).json({ message: "get all contacts" });
});

router.route("/:id").get((req, res) => {
  res
    .status(200)
    .json({ message: `get employee details employee :  ${req.params.id}` });
});

router.route("/").post((req, res) => {
  res.status(200).json({ message: "create employee" });
});

router.route("/:id").put((req, res) => {
  res.status(200).json({ message: `update employee : ${req.params.id}` });
});

router.route("/:id").delete((req, res) => {
  res.status(200).json({ message: `employee deleted : ${req.params.id}` });
});

module.exports = router;
