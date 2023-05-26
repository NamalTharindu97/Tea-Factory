import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const ProductionCard1 = ({ production }) => {
  return (
    <div className="container">
      <div className="card">
        <h5 className="card-header">Featured</h5>
        <div className="card-body">
          <h5 className="card-title">Production ID: {production.ProdutionID}</h5>
          <p className="card-text">Description: {production.description}</p>
          <p className="card-text">Start Date: {production.startDate}</p>
          <p className="card-text">End Date: {production.endDate}</p>
          <p className="card-text">Status: {production.status}</p>
          <p className="card-text">Tea Type: {production.teaType}</p>
          <p className="card-text">Batch Number: {production.batchNumber}</p>
          <Link to={`/edit-production/${production.id}`} className="btn btn-primary">Generate Report</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductionCard1;
