const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dbConnection = require("./config/dbConnection");
const validateToken = require("./middleware/validateTokenHandler");
const dotenv = require("dotenv").config();

dbConnection();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1/tea-factory/employees", require("../backend/routes/employeeRoutes"));
app.use(errorHandler);
app.use(validateToken);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
