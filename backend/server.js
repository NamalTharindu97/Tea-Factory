const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dbConnection = require("./config/dbConnection");
const validateToken = require("./middleware/validateTokenHandler");
const cors = require("cors");
const dotenv = require("dotenv").config();

dbConnection();
const app = express();

const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use("/api/v1/tea-factory/employees", require("../backend/routes/employeeRoutes"));
app.use("/api/v1/tea-factory/inventory", require("../backend/routes/inventoryRoutes"));
app.use("/api/v1/tea-factory/payrolls", require("../backend/routes/payrollRoutes"));
app.use("/api/v1/tea-factory/productions", require("../backend/routes/productionRoutes"));
app.use(errorHandler);
app.use(validateToken);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

module.exports = app;
