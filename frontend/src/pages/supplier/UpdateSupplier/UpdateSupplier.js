import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Box, MenuItem } from "@mui/material";
import Sidebar from "../Sidebar/sidebar";
import "../UpdateSupplier/updateSupplier.css";
import gifImage from "../SupplierSummery/tea.gif";

const UpdateSupplier = () => {
  const { id } = useParams();
  const location = useLocation();
  const supplier = location.state.supplier;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: supplier.name,
    item: supplier.item,
    address: supplier.address,
    phone: supplier.phone,
    email: supplier.email,
    bank: supplier.bank,
    bankNo: supplier.bankNo,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.item) {
      newErrors.item = "Item is required";
    }

    if (!formData.address) {
      newErrors.address = "Address is required";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.bank) {
      newErrors.bank = "Bank is required";
    }

    if (!formData.bankNo) {
      newErrors.bankNo = "Bank Number is required";
    } else if (!/^\d+$/.test(formData.bankNo)) {
      newErrors.bankNo = "Invalid bank number";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const confirmed = window.confirm(
        "Are you sure you want to update the supplier?"
      );
      if (confirmed) {
        try {
          await axios.put(`/supliers/${id}`, {
            name: formData.name,
            item: formData.item,
            address: formData.address,
            phone: formData.phone,
            email: formData.email,
            bank: formData.bank,
            bankNo: formData.bankNo,
          });
          navigate("/SupplierAdminPanal/SupplierSummery");
        } catch (error) {
          console.log(error);
          // Handle error
        }
      }
    }
  };

  return (
    <div className="bor">
      <Box
        sx={{
          display: "-webkit-flex",
          Width: 600,
          mx: "auto",
          marginLeft: "-620px",
          marginTop: "6px",
          marginBottom: "10px",
        }}
      >
        <Sidebar />
        <div style={{ flex: 1 }}>
          <h2>Update Supplier</h2>
          <form onSubmit={handleSubmit}>
            <div className="yo">
              <TextField
                id="name"
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
                error={!!errors.name}
                helperText={errors.name}
              />
            </div>
            <div>
              <TextField
                id="item"
                name="item"
                label="Item"
                select
                value={formData.item}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
                error={!!errors.item}
                helperText={errors.item}
              >
                <MenuItem value="tea">Tea</MenuItem>
                <MenuItem value="fuel">Fuel</MenuItem>
                <MenuItem value="chemical">Chemical</MenuItem>
              </TextField>
            </div>
            <div>
              <TextField
                id="address"
                name="address"
                label="Address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
                error={!!errors.address}
                helperText={errors.address}
              />
            </div>
            <div>
              <TextField
                id="phone"
                name="phone"
                label="Phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </div>
            <div>
              <TextField
                id="email"
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
                error={!!errors.email}
                helperText={errors.email}
              />
            </div>
            <div>
              <TextField
                id="bank"
                name="bank"
                label="Bank"
                value={formData.bank}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
                error={!!errors.bank}
                helperText={errors.bank}
              />
            </div>
            <div>
              <TextField
                id="bankNo"
                name="bankNo"
                label="Bank Number"
                value={formData.bankNo}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
                error={!!errors.bankNo}
                helperText={errors.bankNo}
              />
            </div>
            <div className="b1">
              <button className="btn btn-outline-success">Update</button>
            </div>
          </form>
        </div>
        <div className="imag">
          <img src={gifImage} alt="GIF" />
        </div>
      </Box>
    </div>
  );
};

export default UpdateSupplier;
