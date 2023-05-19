import React, { useState } from "react";
import axios from "axios";
import "./AddForm.css"


function AddForm() {
  const [formData, setFormData] = useState({
    Id:"",
    name: "",
    description: "",
    quantity: "",
    location: "",
    inTime: "",
    outTime:"",
    supplier: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/v1/tea-factory/inventory/", formData)
      .then((response) => {
        console.log("Form submitted successfully");
        // Reset the form fields if needed
        setFormData({
          Id:"",
          name: "",
          description: "",
          quantity: "",
          location: "",
          inTime: "",
          outTime:"",
          supplier: ""
        });
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  return (
    <div className="AddInvform">
      <h2 className="formTitle">Add Inventory</h2>
      <form onSubmit={handleSubmit}>
        <label className="formLabel">
          Id:
          <input
          className="formInput"
            type="text"
            name="Id"
            value={formData.Id}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="formLabel">
          Name:
          <input
          className="formInput"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="formLabel">
          Description:
          <input
          className="formInput"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label >
        <br />
        <label className="formLabel">
          Quantity:
          <input
          className="formInput"
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="formLabel">
          Location:
          <input
          className="formInput"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="formLabel">
          In Time:
          <input
          className="formInput"
            type="text"
            name="inTime"
            value={formData.inTime}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="formLabel">
          Out Time:
          <input
          className="formInput"
            type="text"
            name="outTime"
            value={formData.outTime}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="formLabel">
          Supplier:
          <input
          className="formInput"
            type="text"
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
          />
        </label>
        <br />
        <button className="formButton" type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddForm;
