import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateSupplier = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    item: "",
    address: "",
    phone: "",
    email: "",
    bank: "",
    bankNo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/supliers/", {
      name: formData.name,
      item: formData.item,
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
      bank: formData.bank,
      bankNo: formData.bankNo,
    });
    navigate("/SupplierAdminPanal/SupplierSummery");
  };
  return (
    <div className="form-container ">
      <h2>Supplier Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="item">Item:</label>
          <input type="text" id="item" name="item" value={formData.item} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="bank">Bank:</label>
          <input type="text" id="bank" name="bank" value={formData.bank} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="bankNo">Bank Number:</label>
          <input type="text" id="bankNo" name="bankNo" value={formData.bankNo} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateSupplier;
