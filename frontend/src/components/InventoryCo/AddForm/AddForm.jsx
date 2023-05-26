import React, { useState } from "react";
import axios from "axios";
import "./AddForm.css";
import { Button, Card, CardContent, Grid, TextField, Typography } from "@material-ui/core";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddForm() {
  const [formData, setFormData] = useState({
    Id: "",
    name: "",
    description: "",
    quantity: "",
    location: "",
    inTime: "",
    outTime: "",
    supplier: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      axios
        .post("http://localhost:5000/api/v1/tea-factory/inventory/", formData)
        .then((response) => {
          console.log("Form submitted successfully");
          // Reset the form fields if needed
          setFormData({
            Id: "",
            name: "",
            description: "",
            quantity: "",
            location: "",
            inTime: "",
            outTime: "",
            supplier: "",
          });
          toast.success("Inventory Added successfully", {position: toast.POSITION.TOP_CENTER,});
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    } else {
      // Update the form errors state
      setFormErrors(errors);
    }
  };

  const validateForm = (data) => {
    const errors = {};

    // Perform validation for each field
    if (!data.Id) {
      errors.Id = "Please enter ID";
    }

    if (!data.name) {
      errors.name = "Please enter inventory name";
    }

    if (!data.description) {
      errors.description = "Please enter description";
    }

    if (!data.quantity) {
      errors.quantity = "Please enter quantity";
    }

    if (!data.location) {
      errors.location = "Please enter location";
    }

    if (!data.inTime) {
      errors.inTime = "Please enter in time";
    }

    if (!data.supplier) {
      errors.supplier = "Please enter supplier";
    }

    return errors;
  };

  return (
    <div className="form-container">
      <ToastContainer/>
      <Card className="form-card" style={{ maxWidth: 850, margin: "0 auto", padding: "20px 5px", boxShadow: "0 2px 20px rgba(0, 0, 0, 0.4)" }}>
        <CardContent>
          <Typography gutterBottom variant="h4">
            Add Inventory
          </Typography>
          <div className="form-scroll-container">
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={1}>
                <Grid xs={12} item style={{ marginBottom: "8px" }}>
                  <TextField
                    label="Id"
                    placeholder="Enter ID"
                    variant="outlined"
                    fullWidth
                    name="Id"
                    required
                    value={formData.Id}
                    onChange={handleChange}
                    error={formErrors.Id ? true : false}
                    helperText={formErrors.Id}
                    className={formErrors.Id ? "TextField__error" : ""}
                    inputProps={{ style: { height: "10px" } }}
                  />
                </Grid>
                <Grid xs={12} item style={{ marginBottom: "8px" }}>
                  <TextField
                    label="Inventory Name"
                    placeholder="Enter Name"
                    variant="outlined"
                    fullWidth
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={formErrors.name ? true : false}
                    helperText={formErrors.name}
                    className={formErrors.name ? "TextField__error" : ""}
                    inputProps={{ style: { height: "10px" } }}
                  />
                </Grid>
                <Grid xs={12} item style={{ marginBottom: "8px" }}>
                  <TextField
                    label="Description"
                    multiline
                    rows={3}
                    placeholder="Enter Description"
                    variant="outlined"
                    fullWidth
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    error={formErrors.description ? true : false}
                    helperText={formErrors.description}
                    className={formErrors.description ? "TextField__error" : ""}
                  />
                </Grid>
                <Grid xs={12} item style={{ marginBottom: "8px" }}>
                  <TextField
                    type="number"
                    label="Quantity"
                    placeholder="Enter Quantity"
                    variant="outlined"
                    fullWidth
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    error={formErrors.quantity ? true : false}
                    helperText={formErrors.quantity}
                    className={formErrors.quantity ? "TextField__error" : ""}
                    inputProps={{ style: { height: "10px" } }}
                  />
                </Grid>
                <Grid xs={12} item style={{ marginBottom: "8px" }}>
                  <TextField
                    label="Location"
                    placeholder="Enter Location"
                    variant="outlined"
                    fullWidth
                    required
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    error={formErrors.location ? true : false}
                    helperText={formErrors.location}
                    className={formErrors.location ? "TextField__error" : ""}
                    inputProps={{ style: { height: "10px" } }}
                  />
                </Grid>
                <Grid xs={12} item style={{ marginBottom: "8px" }}>
                  <TextField
                    type="time"
                    label="In Time"
                    placeholder="Enter In Time"
                    variant="outlined"
                    fullWidth
                    required
                    name="inTime"
                    value={formData.inTime}
                    onChange={handleChange}
                    error={formErrors.inTime ? true : false}
                    helperText={formErrors.inTime}
                    className={formErrors.inTime ? "TextField__error" : ""}
                    inputProps={{ style: { height: "10px" } }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid xs={12} item style={{ marginBottom: "8px" }}>
                  <TextField
                    type="time"
                    label="Out Time"
                    placeholder="Enter Out Time"
                    variant="outlined"
                    fullWidth
                    name="outTime"
                    value={formData.outTime || '--'}
                    onChange={handleChange}
                    inputProps={{ style: { height: "10px" } }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid xs={12} item style={{ marginBottom: "8px" }}>
                  <TextField
                    label="Supplier"
                    placeholder="Enter Supplier"
                    variant="outlined"
                    fullWidth
                    required
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleChange}
                    error={formErrors.supplier ? true : false}
                    helperText={formErrors.supplier}
                    className={formErrors.supplier ? "TextField__error" : ""}
                    inputProps={{ style: { height: "10px" } }}
                  />
                </Grid>
                <Grid xs={12} item>
                  <Button type="submit" variant="contained" style={{ backgroundColor: "green", color: "white" }}>
                    ADD
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddForm;
