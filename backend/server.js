const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  "/api/v1/tea-factory/employees",
  require("../backend/routes/employeeRoutes")
);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
