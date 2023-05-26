import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./productionAdd.css";

const ProductionAdd = () => {
  const navigate = useNavigate();

  const [productionData, setProductionData] = useState({
    ProdutionID: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "",
    teaType: "",
    batchNumber: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setProductionData({
      ...productionData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!productionData.ProdutionID) {
      errors.ProdutionID = "Please enter the production ID";
    }

    if (!productionData.description) {
      errors.description = "Please enter the production description";
    }

    if (!productionData.startDate) {
      errors.startDate = "Please enter the production start date";
    }

    if (!productionData.endDate) {
      errors.endDate = "Please enter the production end date";
    }

    if (!productionData.status) {
      errors.status = "Please enter the production status";
    }

    if (!productionData.teaType) {
      errors.teaType = "Please enter the production tea type";
    }

    if (!productionData.batchNumber) {
      errors.batchNumber = "Please enter the production batch number";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      axios.post("/productions/", {
        ProdutionID: productionData.ProdutionID,
        description: productionData.description,
        startDate: productionData.startDate,
        endDate: productionData.endDate,
        status: productionData.status,
        teaType: productionData.teaType,
        batchNumber: productionData.batchNumber,
      });
      navigate("/ProductionAdminPanal/ProductionList");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="production-form">
      <div>
        <label>Production ID:</label>
        <input type="text" name="ProdutionID" value={productionData.ProdutionID} onChange={handleChange} className={errors.ProdutionID ? "error" : ""} />
        {errors.ProdutionID && <div className="error-message">{errors.ProdutionID}</div>}
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={productionData.description} onChange={handleChange} className={errors.description ? "error" : ""}></textarea>
        {errors.description && <div className="error-message">{errors.description}</div>}
      </div>
      <div>
        <label>Start Date:</label>
        <input type="text" name="startDate" value={productionData.startDate} onChange={handleChange} className={errors.startDate ? "error" : ""} />
        {errors.startDate && <div className="error-message">{errors.startDate}</div>}
      </div>
      <div>
        <label>End Date:</label>
        <input type="text" name="endDate" value={productionData.endDate} onChange={handleChange} className={errors.endDate ? "error" : ""} />
        {errors.endDate && <div className="error-message">{errors.endDate}</div>}
      </div>
      <div>
        <label>Status:</label>
        <input type="text" name="status" value={productionData.status} onChange={handleChange} className={errors.status ? "error" : ""} />
        {errors.status && <div className="error-message">{errors.status}</div>}
      </div>
      <div>
        <label>Tea Type:</label>
        <input type="text" name="teaType" value={productionData.teaType} onChange={handleChange} className={errors.teaType ? "error" : ""} />
        {errors.teaType && <div className="error-message">{errors.teaType}</div>}
      </div>
      <div>
        <label>Batch Number:</label>
        <input type="text" name="batchNumber" value={productionData.batchNumber} onChange={handleChange} className={errors.batchNumber ? "error" : ""} />
        {errors.batchNumber && <div className="error-message">{errors.batchNumber}</div>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductionAdd;
