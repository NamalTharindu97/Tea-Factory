import React, { useEffect, useState } from "react";
import "./Card.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import axios from "axios";
import { UilTrees, UilBox, UilTear } from "@iconscout/react-unicons";

const Card = () => {
  return (
    <div className="CardContaier">
      <CompactCard />
      <CompactCard01 />
      <CompactCard02 />
    </div>
  );
};

function CompactCard() {
  const [count, setCount] = useState();
  const [percentage, setPercentage] = useState();

  useEffect(() => {
    const getQuantityCount = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/tea-factory/inventory/count/getquantity");
        const data = response.data.totalQty;

        setCount(data);

        const maxValue = 5000; // Set your maximum value here
        const calculatedPercentage = (data / maxValue) * 100;
        const formattedPercentage = calculatedPercentage.toFixed(1); // Format the percentage to one decimal place
        setPercentage(formattedPercentage);
      } catch (error) {
        console.error(error);
      }
    };

    getQuantityCount();
  }, []);

  const Png = UilTrees;

  // Custom styles for the progress bar
  

  return (
    <div
      className="CompactCard"
      style={{
        background: "linear-gradient(to bottom,#00802b, #00cc33 )",
        boxShadow: "0px 10px 20px 0px rgba(0, 128, 43, 0.5)",
      }}
    >

      <div className="radialBar">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          className="inv-progress-bar"
          styles={buildStyles({
            path: {
              // Path color
              stroke: "#00e676",
              textShadow: " 0px 0px 8px rgb(255, 255, 255)",
              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: "round",
              // Customize transition animation
              transition: "stroke-dashoffset 5.0s ease 0s",
            },
            // Customize the "total progress"
            trail: {
              // Trail color
              stroke: "#898b9a",
              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: "butt",
              // Rotate the trail
            },
          })}
        />
        <span>Tea Leaf</span>
      </div>
      <div className="detail">
        <Png />
        <span>{count} KG</span>
        <span>Total tea leaf quantity</span>
      </div>
    </div>
  );
}

 function CompactCard01() {

   const [count, setCount] = useState();
   const [percentage, setPercentage] = useState();

   useEffect(() => {
     const getQuantityCount = async () => {
       try {
         const response = await axios.get("http://localhost:5000/api/v1/tea-factory/inventory/count/getquantity");
         const data = response.data.totalQty;

         setCount(data);

         const maxValue = 5000; // Set your maximum value here
         const calculatedPercentage = (data / maxValue) * 100;
         const formattedPercentage = calculatedPercentage.toFixed(1); // Format the percentage to one decimal place
         setPercentage(formattedPercentage);
       } catch (error) {
         console.error(error);
       }
     };

     getQuantityCount();
   }, []);


   const Png = UilBox;
   return (
     <div
       className="CompactCard"
       style={{
         background: "linear-gradient(180deg, #006A4E 0%, #1CAC78 100%)",
         boxShadow: "0px 10px 20px 0px rgba(0, 106, 78, 0.5)",
       }}
     >
       <div className="radialBar">
         <CircularProgressbar  value="52" text={`52%` }
         className="inv-progress-bar" 
         
         />
         <span>Finish Goods</span>
       </div>
       <div className="detail">
         <Png />
         <span>0 Pkg</span>
         <span>Total products Pkg</span>
       </div>
     </div>
   );
 }



 function CompactCard02() {

   const [count, setCount] = useState();
   const [percentage, setPercentage] = useState();

   useEffect(() => {
     const getQuantityCount = async () => {
       try {
         const response = await axios.get("http://localhost:5000/api/v1/tea-factory/inventory/count/getquantity");
         const data = response.data.totalQty;

         setCount(data);

         const maxValue = 5000; // Set your maximum value here
         const calculatedPercentage = (data / maxValue) * 100;
         const formattedPercentage = calculatedPercentage.toFixed(1); // Format the percentage to one decimal place
         setPercentage(formattedPercentage);
       } catch (error) {
         console.error(error);
       }
     };

     getQuantityCount();
   }, []);


   const Png = UilTear;
   return (
     <div
       className="CompactCard"
       style={{
         background: "linear-gradient(#FEBE10 0%, #FFD700 100%)",
         boxShadow: "0px 10px 20px 0px rgba(254, 190, 16, 0.5)",
       }}
     >
       <div className="radialBar">
         <CircularProgressbar  value={percentage} text={`${percentage}%` }
         className="inv-progress-bar" 
         
         />
         <span>Consumables</span>
       </div>
       <div className="detail">
         <Png />
         <span>0 L</span>
         <span>Total consumables</span>
       </div>
     </div>
   );
 }

 export default Card;

