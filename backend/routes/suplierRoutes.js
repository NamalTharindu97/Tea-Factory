const express = require("express");
const router = express.Router();
const { getSuplier, getSingleSuplier, createSuplier, updateSuplier, deleteSuplier } = require("../controllers/suplierController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route("/").get(getSuplier);
router.route("/:id").get(getSingleSuplier);
router.route("/").post(createSuplier);
router.route("/:id").put(updateSuplier);
router.route("/:id").delete(deleteSuplier);

module.exports = router;
