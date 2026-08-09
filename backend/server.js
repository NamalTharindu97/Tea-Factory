const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dbConnection = require("./config/dbConnection");
const cors = require("cors");
const dotenv = require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5001;

// Only allow requests from the frontend origins (the rest of the app is same-origin
// via the CRA dev proxy or nginx, so no credentials/CORS headers are needed in production).
const allowedOrigins = ["http://localhost:3000", "http://localhost:5050", "http://localhost:5000"];
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// Routes
app.use("/api/v1/tea-factory/employees", require("../backend/routes/employeeRoutes"));
app.use("/api/v1/tea-factory/inventory", require("../backend/routes/inventoryRoutes"));
app.use("/api/v1/tea-factory/payrolls", require("../backend/routes/payrollRoutes"));
app.use("/api/v1/tea-factory/productions", require("../backend/routes/productionRoutes"));
app.use("/api/v1/tea-factory/supliers", require("../backend/routes/suplierRoutes"));
app.use("/api/v1/tea-factory/ai", require("../backend/routes/aiRoutes"));

// 404 for unknown routes (previously unmatched paths reached the token validator and hung)
app.use((req, res) => {
  res.status(404).json({ title: "Not Found", message: "Route not found" });
});

// Error handler (must be registered last)
app.use(errorHandler);

// Skip the listener under tests so supertest can bind the app without a port
if (process.env.NODE_ENV !== "test") {
  dbConnection();
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
}

module.exports = app;
