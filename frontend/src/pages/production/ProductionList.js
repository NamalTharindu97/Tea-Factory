import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductionList = () => {
  const [production, setProduction] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProduction = async () => {
      try {
        const response = await axios.get("/productions/");
        setProduction(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduction();
  }, []);

  const handleUpdate = (id) => {
    const product = production.find((sup) => sup._id === id);
    navigate(`/SupplierAdminPanal/SupplierSummery/UpdateSupplier/${id}`, { state: { product } });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/productions/${id}`);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };
  return (
    <div>
      {production.map((sup) => (
        <ul key={sup._id}>
          <li>{sup.address}</li>
          <li>{sup.bank}</li>
          <li>{sup.bankNo}</li>
          <li>{sup.createdAt}</li>
          <li>{sup.email}</li>
          <li>{sup.item}</li>
          <li>{sup.name}</li>
          <li>{sup.phone}</li>
          <li>{sup.updatedAt}</li>
          <button onClick={() => handleUpdate(sup._id)}>update</button>
          <button onClick={() => handleDelete(sup._id)}>delete</button>
        </ul>
      ))}
    </div>
  );
};

export default ProductionList;
