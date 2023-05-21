const asyncHandler = require("express-async-handler");
const Production = require("../models/productionModel");


//GET all Productions
//GET - http://localhost:5000/api/v1/tea-factory/productions/
const getProduction = asyncHandler(async (req, res) => {
  const production = await Production.find();
  res.status(200).json(production);
});

//GET Single Production
//GET - http://localhost:5000/api/v1/tea-factory/productions/:id
const getSingleProduction = async (req, res, next) => {
  try {
    const production = await Production.findById(req.params.id);
    res.status(200).json(production);
  } catch (err) {
    next(err);
  }
};



//create new Production
//POST - http://localhost:5000/api/v1/tea-factory/productions/
const createProduction = asyncHandler(async (req, res) => {
  const {ProdutionID,description,startDate,endDate,status,teaType,batchNumber} = req.body;
  if (!ProdutionID|| !description || !startDate|| !endDate || ! status || !teaType || ! batchNumber) {
    res.status(400);
    throw new Error("all fields are mandotory");
  }
  const production = await Production.create({
    ProdutionID,description,startDate,endDate,status,teaType, batchNumber 
  });
  if (!production) {
    res.status(404);
    throw new Error("Production data not valid");
  }
  res.status(201).json(production);
});


//UPDATE
//PUT - http://localhost:5000/api/v1/tea-factory/productions/:id
 const updateProduction = asyncHandler(async (req, res) => {
   const production = await Production.findById(req.params.id);
   if (!production) {
     res.status(404);
     throw new Error("Production Not Found");
   }
   const updatedProduction = await Production.findByIdAndUpdate(req.params.id, req.body, {
     new: true,
   });
   res.status(200).json(updatedProduction);
 });


//DELETE  Production
//DELETE - http://localhost:5000/api/v1/tea-factory/productions/:id
const deleteProduction= asyncHandler(async (req, res) => {
  const production = await Production.findById(req.params.id);
  if (!production) {
    res.status(404);
    throw new Error("Production Not Found");
  }
  const deleteproduction = await Production.findByIdAndDelete(req.params.id);
  res.status(200).json("Production Details has been Deleted");
});



module.exports = {
    getProduction,createProduction,getSingleProduction,updateProduction,deleteProduction
};
