import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import axios from "axios";

export const DeleteConfirmBtn = ({ id }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`/employees/${id}`);
      if (!response) {
        console.log("not response from delete btn");
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }

    setIsDialogOpen(false);
  };
  return (
    <>
      <button className="delete-button" onClick={handleDeleteButtonClick}>
        Delete
      </button>
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Are you sure you want to delete this employee?</DialogTitle>
        <DialogContent>
          <p>You cannot undo this action.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" color="error" onClick={() => handleDeleteConfirm(id)}>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
