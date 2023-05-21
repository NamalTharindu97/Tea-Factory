import React, { useState } from "react";
import "./productionForm.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProductionForm = () => {
  const location = useLocation();
  const product = location.state.product;
  const { id } = useParams();
  const navigate = useNavigate();

  const [productionData, setProductionData] = useState({
    ProdutionID: product.ProdutionID,
    description: product.description,
    startDate: product.startDate,
    endDate: product.endDate,
    status: product.status,
    teaType: product.teaType,
    batchNumber: product.batchNumber,
  });

  const handleChange = (e) => {
    setProductionData({
      ...productionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/productions/${id}`, {
      ProdutionID: productionData.ProdutionID,
      description: productionData.description,
      startDate: productionData.startDate,
      endDate: productionData.endDate,
      status: productionData.status,
      teaType: productionData.teaType,
      batchNumber: productionData.batchNumber,
    });
    navigate("/ProductionAdminPanal/ProductionList");
  };

  return (
    <form onSubmit={handleSubmit} className="production-form ">
      <div>
        <label>Production ID:</label>
        <input type="text" name="ProdutionID" value={productionData.ProdutionID} onChange={handleChange} />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={productionData.description} onChange={handleChange}></textarea>
      </div>
      <div>
        <label>Start Date:</label>
        <input type="text" name="startDate" value={productionData.startDate} onChange={handleChange} />
      </div>
      <div>
        <label>End Date:</label>
        <input type="text" name="endDate" value={productionData.endDate} onChange={handleChange} />
      </div>
      <div>
        <label>Status:</label>
        <input type="text" name="status" value={productionData.status} onChange={handleChange} />
      </div>
      <div>
        <label>Tea Type:</label>
        <input type="text" name="teaType" value={productionData.teaType} onChange={handleChange} />
      </div>
      <div>
        <label>Batch Number:</label>
        <input type="text" name="batchNumber" value={productionData.batchNumber} onChange={handleChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductionForm;
