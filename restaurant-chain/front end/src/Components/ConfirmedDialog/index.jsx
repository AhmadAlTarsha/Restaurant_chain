//!react import
import React,{useState} from "react";
//!mui import
import {Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from "@mui/material";

//!file import
// import SimpleSnackbar from "../Snackbar";

const ConfirmedAndEditDialog = ({ itemId, openDialog,setOpenDialog, fun, itemName, isDeleted,snackBarStatus,snackBarText }) => {
console.log(itemId,isDeleted);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  
  const handleCloseDialog = () => setOpenDialog(false);


  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle id="responsive-dialog-title">{"Delete item"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Ary you shower you want delete this ${itemName}.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDialog}>
            Disagree
          </Button>
          <Button
            onClick={() => {
              fun(itemId, isDeleted);
              setTimeout(() => {
                setOpenSnackbar(true);
              }, 1000);
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      {/* <SimpleSnackbar
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        text={snackBarText}
        status={snackBarStatus}
      /> */}
    </>
  );
};

export default ConfirmedAndEditDialog;
