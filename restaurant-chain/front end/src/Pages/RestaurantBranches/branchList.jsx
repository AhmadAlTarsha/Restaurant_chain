import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
  Button,
  Typography,
  Backdrop,
  CircularProgress,
  Box,
} from "@mui/material";

import AddModal from "../../Components/AddModal";
import SimpleSnackbar from "../../Components/Snackbar";
import ConfirmedAndEditDialog from "../../Components/ConfirmedDialog";
import {
  AddBranchesState,
  DeleteBranchesState,
  EditBranchesState,
} from "../../Service/Redux/res_Branches";

import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditModal from "../../Components/EditModal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontWeight: "bold",
}));

const BranchesList = ({
  branches,
  handleEdit,
  branchUpdate,
  BranchSelector,
  itemName,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackBarText, setSnackBarText] = useState("");
  const [snackBarStatus, setSnackBarStatus] = useState("");

  const handleClickOpenConfirmDialog = () => setOpenDialog(true);
  const handleCloseConfirmedDialog = () => setOpenDialog(false);

  const handleShowAddModel = () => setShowAddModal(true);
  const handleCloseAddModel = () => setShowAddModal(false);

  const handleShowEditModel = () => setShowEditModal(true);
  const handleCloseEditModel = () => {
    setShowEditModal(false);
    setContent(emptyContent);
  };

  const dispatch = useDispatch();

  const [content, setContent] = useState({
    name: "",
    street_name: "",
    phone: "",
  });
  const emptyContent = {
    name: "",
    street_name: "",
    phone: "",
  };
  const [branchData, setBranchData] = useState({
    branchId: 0,
    active: 0,
  });

  //-------------------------------------------------------------------------------------this function Add new branch to the db
  const addNewBranch = async ({ name, phone, street_name }) => {
    if (!name.trim() || !phone.trim() || !street_name.trim()) {
      setSnackBarText("some info is undefine");
      setSnackBarStatus("error");
      setTimeout(() => {
        setOpenSnackbar(true);
      }, 1000);
    } else {
      dispatch(AddBranchesState({ name, phone, street_name }));
      // setSnackBarText("branch added successfully");
      // setSnackBarStatus("success");
      setTimeout(() => {
        setOpenSnackbar(true);
      }, 1000);
    }

    handleCloseAddModel();
    setContent(emptyContent);
  };
  //-------------------------------------------------------------------------------------this function delete selected branch from db
  const deleteCurrentBranch = (branchId, active) => {
    dispatch(
      DeleteBranchesState({
        branchId,
        active: active,
      })
    );
    handleCloseConfirmedDialog();
  };
  //-------------------------------------------------------------------------------------this function edit selected branch from db
  const updateCurrentBranch =  (branchId) => {

   
    if (!( content.name.trim() &&
      content.phone.trim() &&
      content.street_name.trim())
     
    ) {
      
   
      setSnackBarText("some info is undefine");
      setSnackBarStatus("error");
      // setTimeout(() => {
      //   setOpenSnackbar(true);
      // }, 1000);
    } else {
      dispatch(EditBranchesState({ branchId, content }));
    }

    handleCloseEditModel();
  };
  return (
    <Box sx={{ backgroundColor: "lightgray", minHeight: "100vh", padding: 3 }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={branchUpdate}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 3,
        }}
      >
        <Typography variant="h4">Branches</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleShowAddModel();
          }}
        >
          Add Branch
        </Button>
      </Box>
      {!(branches?.length === 0) ? (
        <TableContainer component={Paper} sx={{ marginTop: 3 }}>
          <Table aria-label="branches table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Branch Name</StyledTableCell>
                <StyledTableCell>Created At</StyledTableCell>
                <StyledTableCell>Location</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {branches?.map((branch) => (
                <TableRow key={branch.id}>
                  <TableCell>{branch.name}</TableCell>
                  <TableCell>{branch.created_at}</TableCell>
                  <TableCell>{branch.street_name}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setContent({
                            name: branch.name,
                            street_name: branch.street_name,
                            phone: branch.phone,
                          });
                          setBranchData({
                            branchId: branch.id,
                            active: branch.active,
                          });
                          handleShowEditModel();
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="secondary"
                        onClick={() => {
                          setBranchData({
                            branchId: branch.id,
                            active: 0,
                          });
                          handleClickOpenConfirmDialog();
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Paper sx={{ padding: 3, marginTop: 3 }}>
          <Typography variant="h6" gutterBottom>
            There are no branches added yet.
          </Typography>
        </Paper>
      )}

      <ConfirmedAndEditDialog
        handleCloseDialog={handleCloseConfirmedDialog}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        fun={deleteCurrentBranch}
        itemId={branchData.branchId}
        isDeleted={branchData.active}
        itemName={itemName}
        snackBarText={BranchSelector.snackBarMessage}
        snackBarStatus={BranchSelector.snackBarStatus}
      />
      <AddModal
        snackBarText={BranchSelector.snackBarMessage}
        snackBarStatus={BranchSelector.snackBarStatus}
        show={showAddModal}
        setShow={setShowAddModal}
        handleShowModel={handleShowAddModel}
        itemName={itemName}
        fun={addNewBranch}
        handleCloseModel={handleCloseAddModel}
        content={content}
        setContent={setContent}
      />

      <EditModal
        snackBarText={BranchSelector.snackBarMessage}
        snackBarStatus={BranchSelector.snackBarStatus}
        show={showEditModal}
        setShow={setShowEditModal}
        handleShowModel={handleShowEditModel}
        setModalContent={setContent}
        id={branchData.branchId}
        itemName={itemName}
        fun={updateCurrentBranch}
        handleCloseModel={handleCloseEditModel}
        content={content}
        setContent={setContent}
      />
      <SimpleSnackbar
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        text={BranchSelector.snackBarMessage}
        status={BranchSelector.snackBarStatus}
      />
    </Box>
  );
};

export default BranchesList;

{
  /* <Dialog open={openAddDialog} onClose={handleClose}>
        <DialogTitle>Add New Branch</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Branch Name"
            type="text"
            fullWidth
            value={newBranch.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="location"
            label="Location"
            type="text"
            fullWidth
            value={newBranch.location}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="location"
            label="Location"
            type="text"
            fullWidth
            value={newBranch.location}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog> */
}
