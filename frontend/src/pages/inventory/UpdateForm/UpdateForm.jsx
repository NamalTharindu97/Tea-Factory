import React, { useState } from "react";
import axios from "axios";
import { useLocation, useParams, useNavigate  } from "react-router-dom";
import "./UpdateForm.css";
import { Button, Card, CardContent, Grid, TextField, Typography } from "@material-ui/core";
import Sidebar from "../../../components/InventoryCo/Sidebar/Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const inventory = location.state.inventory;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Id: inventory.Id,
    name: inventory.name,
    description: inventory.description,
    quantity: inventory.quantity,
    location: inventory.location,
    inTime: inventory.inTime,
    outTime: inventory.outTime,
    supplier: inventory.supplier,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/inventory/${id}`, {
        Id: formData.Id,
        name: formData.name,
        description: formData.description,
        quantity: formData.quantity,
        location: formData.location,
        inTime: formData.inTime,
        outTime: formData.outTime,
        supplier: formData.supplier,
      });
      toast.success("Inventory updated successfully", {position: toast.POSITION.TOP_CENTER,});
      setTimeout(() => {
        navigate('/viewInventory'); // Redirect to /viewInventory page after a delay
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />

        <div className="form-container">
        <ToastContainer />
        
          <Card className="form-card" style={{ maxWidth: 850, margin: "0 auto", padding: "20px 5px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)"}}>
            <CardContent>
              <Typography gutterBottom variant="h4">
                Update Inventory
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
                        value={formData.outTime}
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
                        inputProps={{ style: { height: "10px" } }}
                      />
                    </Grid>
                    <Grid xs={12} item>
                      <Button type="submit" variant="contained" style={{ backgroundColor: "green", color: "white" }}>
                        Update
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
