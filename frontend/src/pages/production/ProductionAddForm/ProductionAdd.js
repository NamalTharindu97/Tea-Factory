import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from 'react-modal';
import Image1 from "../../../asserts/ProductionAs/images/1.png";
import "./productionAdd.css";
import ProductionFooter from "../../../components/ProductionCo/ProductionFooter/ProductionFooter";


const ProductionAdd = (props) => {
  const navigate = useNavigate();
  const {handleCloseModal} = props

  

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

    <div>
     <h3 style={{ textAlign: 'center' }}>Create New Production</h3>
    <form onSubmit={handleSubmit} className="production-form">
  

      <div className="image1">
      <img src={Image1} alt="Tea Cup Image" width={500} height={400} />
      </div>
      <div className="form1">

        <label>
          Production ID
          
          <input
            type="text"
            name="ProdutionID"
            value={productionData.ProdutionID}
            onChange={handleChange}
            className={errors.ProdutionID ? "error" : ""}
          />
          {errors.ProdutionID && (
            <div className="error-message">{errors.ProdutionID}</div>
          )}
        </label>
      
        

        <label>
          Description
          <br />
          <input
            type="text"
            name="description"
            value={productionData.description}
            onChange={handleChange}
            className={errors.description ? "error" : ""}
          />
          {errors.description && (
            <div className="error-message">{errors.description}</div>
          )}
        </label>
       

        <label>
          Start Date
         
          <input
            type="text"
            name="startDate"
            value={productionData.startDate}
            onChange={handleChange}
            className={errors.startDate ? "error" : ""}
          />
          {errors.startDate && (
            <div className="error-message">{errors.startDate}</div>
          )}
        </label>
     

        <label>
          End Date
   
          <input
            type="text"
            name="endDate"
            value={productionData.endDate}
            onChange={handleChange}
            className={errors.endDate ? "error" : ""}
          />
          {errors.endDate && (
            <div className="error-message">{errors.endDate}</div>
          )}
        </label>
    
      

     <div className="labs">

        <label>
          Status
  
          <input
            type="text"
            name="status"
            value={productionData.status}
            onChange={handleChange}
            className={errors.status ? "error" : ""}
          />
          {errors.status && (
            <div className="error-message">{errors.status}</div>
          )}
        </label>
    

        <label>
          Tea Type
     
          <input
            type="text"
            name="teaType"
            value={productionData.teaType}
            onChange={handleChange}
            className={errors.teaType ? "error" : ""}
          />
          {errors.teaType && (
            <div className="error-message">{errors.teaType}</div>
          )}
        </label>
     

        <label>
          Batch Number
          
          <input
            type="text"
            name="batchNumber"
            value={productionData.batchNumber}
            onChange={handleChange}
            className={errors.batchNumber ? "error" : ""}
          />
          {errors.batchNumber && (
            <div className="error-message">{errors.batchNumber}</div>
          )}
        </label>
        <br />

       
        <button style={{ backgroundColor:"#19b626", padding: '12px 25px', borderRadius: '5px', margin: '0 10px' }}>Save</button>
        <button style={{ backgroundColor:"#19b626", padding: '12px 25px', borderRadius: '5px', margin: '0 10px' }} onClick={handleCloseModal}>Close</button>

</div>
</div>
 
 </form>
 <div className="foot">
<ProductionFooter/>
</div>
       
    </div>


  );
};

export default ProductionAdd;