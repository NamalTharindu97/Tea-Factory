import React from 'react';
import video from '../supplierAdminPanal/tea.mp4'
import '../supplierAdminPanal/admin.css'


const supplierAdminPanal = () => {
  return (

    <div className="home-page">
      <video className="background-video" autoPlay muted loop>
        <source src={video} type="video/mp4" />
      </video>
      <div className="content">
        <h1 className="welcome-text">Welcome to the Supplier Management</h1>
        <div className="para">
        <p >This is the welcome of our supplier management system.From now,we can enter to our system.In here,we are always ready to add new suppliers to our institution.</p></div>
       <div className='n1'>
        <button className="btn btn-outline-light btn-lg">
        <a href='/SupplierAdminPanal/SupplierSummery' style={{ textDecoration: "none", color: "white" }}>
           Next
            </a>
        </button>
        </div>
      
        
     

      </div>
    </div>
  );
};

export default supplierAdminPanal;

