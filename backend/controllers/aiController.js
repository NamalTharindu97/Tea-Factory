const asyncHandler = require("express-async-handler");
const Employe = require("../models/employeeModel");
const Payroll = require("../models/payrollModel");
const { detectAnomalies, attritionRisk, answerQuery, SUGGESTIONS } = require("../services/aiService");

//@desc GET payroll anomalies
//@Route GET /api/v1/tea-factory/ai/anomalies
//@access HR Manager
const getAnomalies = asyncHandler(async (req, res) => {
  const [employees, payrolls] = await Promise.all([Employe.find(), Payroll.find().sort({ createdAt: -1 }).limit(500)]);
  const flags = detectAnomalies(employees, payrolls);
  res.status(200).json(flags);
});

//@desc GET attrition risk scores
//@Route GET /api/v1/tea-factory/ai/attrition
//@access HR Manager
const getAttrition = asyncHandler(async (req, res) => {
  const [employees, payrolls] = await Promise.all([Employe.find(), Payroll.find()]);
  const risks = attritionRisk(employees, payrolls);
  res.status(200).json(risks);
});

//@desc POST natural-language data question
//@Route POST /api/v1/tea-factory/ai/ask
//@access HR Manager
const askAi = asyncHandler(async (req, res) => {
  const { question } = req.body;
  if (!question || !String(question).trim()) {
    res.status(400);
    throw new Error("question is required");
  }
  const [employees, payrolls] = await Promise.all([Employe.find(), Payroll.find().sort({ createdAt: -1 }).limit(1000)]);
  const result = answerQuery(employees, payrolls, String(question));
  res.status(200).json(result);
});

//@desc GET suggested questions for the chat UI
//@Route GET /api/v1/tea-factory/ai/suggest
//@access HR Manager
const getSuggestions = asyncHandler(async (req, res) => {
  res.status(200).json(SUGGESTIONS);
});

module.exports = { getAnomalies, getAttrition, askAi, getSuggestions };
