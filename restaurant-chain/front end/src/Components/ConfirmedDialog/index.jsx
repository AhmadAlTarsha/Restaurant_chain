import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import SimpleSnackbar from "../Snackbar";

const ConfirmedAndEditDialog = ({
  itemId,
  openDialog,
  setOpenDialog,
  fun,
  itemName,
  isDeleted,
  snackBarStatus,
  snackBarText,
}) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseDialog = () => setOpenDialog(false);

  const handleAgree = () => {
    fun(itemId, isDeleted);
    setTimeout(() => {
      setOpenSnackbar(true);
    }, 1000);
    handleCloseDialog();
  };

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          <Typography variant="h6" component="div">
            Delete Item
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            {`Are you sure you want to delete this ${itemName}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary" variant="outlined">
            Disagree
          </Button>
          <Button onClick={handleAgree} color="primary" variant="contained">
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <SimpleSnackbar
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        text={snackBarText}
        status={snackBarStatus}
      />
    </>
  );
};

export default ConfirmedAndEditDialog;
