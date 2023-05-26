import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from "../../../asserts/ProductionAs/images/pickingtea.jpg";
import { Link } from 'react-router-dom';




const ProductionCard = () => {
  const cardStyle = {
    height: '100px',
    width: '700px',
    margin: '20px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    borderRadius: '5px',
    padding: '220px',
    overflow: 'hidden',
  };

 
  const imageStyle = {
    width: '680px',
    height: '400px',
    borderRadius: '2%', 
    objectFit: 'cover',

  };

  const textContainerStyle = {
    position: 'absolute',
    top: '20%',
    left: '40%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    color: 'white',
  };

  const headingStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  return (
    <div className="container">
      <div className="card" style={cardStyle}>
        <img src={Image} alt="Tea Cup Image" style={imageStyle} />
        <div className="card-body">
          <div style={textContainerStyle}>
            <h1 style={headingStyle}>Welcome To The Production Manager Page</h1>
            <br/>
           <div>
           <Link to="/ProductionAdminPanal/ProductionList">
            <button style={{ backgroundColor:"#19b626", padding: '12px 25px', borderRadius: '5px', margin: '0 10px'  }}>Get Start</button>
          </Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionCard;
