import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './card.css';

const StatisticCard = () => {
  const [supplierCount, setSupplierCount] = useState(0);

  useEffect(() => {
    const fetchSupplierCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/tea-factory/supliers/count/supplier');
        setSupplierCount(response.data);
      } catch (error) {
        console.error(error);
        // Handle error fetching supplier count, e.g., show an error message
      }
    };

    fetchSupplierCount();
  }, []);

  return (
    <div className="statistic-card">
      <h3 className="card-title">Supplier Count</h3>
      <p className="card-value">{supplierCount}</p>
    </div>
  );
};

export default StatisticCard;
