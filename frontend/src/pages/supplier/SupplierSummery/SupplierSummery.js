import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SupplierSummery = () => {
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getSupplier = async () => {
      try {
        const response = await axios.get("/supliers/");
        setSuppliers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSupplier();
  }, []);

  const handleUpdate = (id) => {
    const suplier = suppliers.find((sup) => sup._id === id);
    navigate(`/SupplierAdminPanal/SupplierSummery/UpdateSupplier/${id}`, { state: { suplier } });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/supliers/${id}`);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };
  return (
    <div>
      {suppliers.map((sup) => (
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

export default SupplierSummery;
