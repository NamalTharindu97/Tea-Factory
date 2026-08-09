const express = require("express");
const {
    getProduction,createProduction,getSingleProduction,updateProduction,deleteProduction
} = require("../controllers/productionController");
const validateToken = require("../middleware/validateTokenHandler");

  const router = express.Router();

  router.use(validateToken);

  router.route("/").get(getProduction);
  router.route("/:id").get(getSingleProduction);
  router.route("/").post(createProduction);
  router.route("/:id").put(updateProduction);
  router.route("/:id").delete(deleteProduction);
  
  module.exports = router;
