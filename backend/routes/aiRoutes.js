const express = require("express");
const { getAnomalies, getAttrition, askAi, getSuggestions } = require("../controllers/aiController");
const validateToken = require("../middleware/validateTokenHandler");
const requireRole = require("../middleware/requireRole");
const router = express.Router();

// AI insights are HR-only
router.use(validateToken, requireRole("HR Manager"));

router.route("/anomalies").get(getAnomalies);
router.route("/attrition").get(getAttrition);
router.route("/ask").post(askAi);
router.route("/suggest").get(getSuggestions);

module.exports = router;
