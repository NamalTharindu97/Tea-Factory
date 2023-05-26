import React, { useState,useEffect } from "react";
import "./productionView.css";
import { useParams} from "react-router-dom";
import axios from "axios";
import ProductionCard1 from "../../../components/ProductionCo/ProductionCard1/ProductionCard1";
import ProductionFooter from "../../../components/ProductionCo/ProductionFooter/ProductionFooter";
import Image3 from "../../../asserts/ProductionAs/images/1.png";




const ProductionView = () => {




  const { id } = useParams();
  const [production, setProduction] = useState(null);

  useEffect(() => {
    axios.get(`/productions/${id}`)
      .then(response => {
        setProduction(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  if (!production) {
    return <div>Loading...</div>;
  }

  return (
    <div className="viewcont">
      <h3 style={{ textAlign: "center" }}>View Single Production Details</h3>


      <div className="image3">
      <img src={Image3} alt="Tea Cup Image" width={500} height={400} />
      </div>

      <div className="container">
     
     <label>Production ID:</label> 
        <span>{production.ProdutionID}</span>
      </div>
      <div className="list1">
      <div>
        <label>Description:</label>
        <span>{production.description}</span>
      </div>
      <div>
        <label>Start Date:</label>
        <span>{production.startDate}</span>
      </div>
      <div>
        <label>End Date:</label>
        <span>{production.endDate}</span>
      </div>
      <div>
        <label>Status:</label>
        <span>{production.status}</span>
      </div>
      <div>
        <label>Tea Type:</label>
        <span>{production.teaType}</span>
      </div>
      <div>
        <label>Batch Number:</label>
        <span>{production.batchNumber}</span>
      </div>
      </div>
      <div className="foot2">
        <ProductionFooter/>
    </div>
    
    
        </div>
  );
};





export default ProductionView;