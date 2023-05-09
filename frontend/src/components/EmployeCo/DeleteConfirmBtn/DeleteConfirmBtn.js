import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import axios from "axios";
import "./deleteConfirm.scss";
import { motion } from "framer-motion";
import { navBarVariants } from "../../../asserts/EmployeAs/data/FramerMotionVarients";

export const DeleteConfirmBtn = ({ id, type }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (type === "payroll") {
      try {
        const response = await axios.delete(`/payrolls/${id}`);
        if (!response) {
          console.log("not response from delete btn");
        } else {
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
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
    }
    setIsDialogOpen(false);
  };

  const styles = {
    paper: {
      backgroundImage: "linear-gradient(to top, #eaeaea, #aaaaaa, #6e6e6e, #373737, #000000)",
      boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.5)",
      borderRadius: 25,
      padding: 20,
    },
  };

  return (
    <div className="Delete-btn">
      <button className="delete-button" onClick={handleDeleteButtonClick}>
        Delete
      </button>
      <motion.div variants={navBarVariants} initial="initial" animate="animate">
        <Dialog className="dialog" open={isDialogOpen} onClose={handleDialogClose} PaperProps={{ style: styles.paper }}>
          <motion.div variants={navBarVariants}>
            <DialogTitle className="my-dialog-title">Are You Sure You Want To Delete This Employee?</DialogTitle>
            <DialogContent className="context">This Operation Can't be Undo</DialogContent>
            <DialogActions>
              <button className="cancel-btn" onClick={handleDialogClose}>
                Cancel
              </button>
              <button className="delete-button" onClick={() => handleDeleteConfirm(id)}>
                Yes, Delete
              </button>
            </DialogActions>
          </motion.div>
        </Dialog>
      </motion.div>
    </div>
  );
};
