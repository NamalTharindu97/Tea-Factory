import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import axios from "axios";
import "./deleteConfirm.scss";

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
    <div className="Delete-btn">
      <button className="delete-button" onClick={handleDeleteButtonClick}>
        Delete
      </button>
      <Dialog
        className="dialog"
        open={isDialogOpen}
        onClose={handleDialogClose}
        PaperProps={{
          style: {
            backgroundImage: "linear-gradient(to bottom, #eaeaea, #aaaaaa, #6e6e6e, #373737, #000000)",
            boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <DialogTitle className="my-dialog-title">Are You Sure You Want To Delete This Employee?</DialogTitle>
        <DialogContent className="context">This Operation Can't be Undo</DialogContent>
        <DialogActions>
          <Button className="cancel-btn" onClick={handleDialogClose}>
            Cancel
          </Button>
          <button className="delete-button" onClick={() => handleDeleteConfirm(id)}>
            Yes, Delete
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
