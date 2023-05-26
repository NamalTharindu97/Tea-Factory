import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '../chart/chart.css'
import Sidebar from "../Sidebar/sidebar";

const SupplierChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/tea-factory/supliers/count/item');
        const data = response.data;

        const chartData = Object.entries(data).map(([item, count]) => ({
          item,
          count,
        }));

        setChartData(chartData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="chart-container">

        <Sidebar/>
        
            
        
        <div className='chart'>
        <h1>Item Analysis Chart</h1>
      {chartData ? (
        <BarChart width={800} height={600} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="item" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="rgba(75, 192, 192, 0.6)" />
        </BarChart>
      ) : (
        <p>Loading chart...</p>
      )}
      </div>
    </div>
  );
};

export default SupplierChart;
