import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container, Typography } from "@mui/material";
import BranchesList from "./branchList";
import CenteredCircularProgress from "../../Components/Loader";
import AddModal from "../../Components/AddModal";

import {
  GetBranchesState,
  DeleteBranchesState,
  AddBranchesState
} from "../../Service/Redux/res_Branches";
const Branches = () => {
  const itemName = "branch";
  const [content, setContent] = useState("");


  const [showAddModal, setShowAddModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [snackBarText, setSnackBarText] = useState("");
  const [snackBarStatus, setSnackBarStatus] = useState("");

  const handleShowAddModel = () => setShowAddModal(true);
  const handleCloseAddModel = () => setShowAddModal(false);
  const dispatch = useDispatch();

  const BranchSelector = useSelector((state) => {
    return state.branch;
  });

  const branches = BranchSelector.branches;
 
  const addNewBranch = async (con) => {
console.log(con);
    // if (!image.name|| !partner.trim()) {
    //   setSnackBarText("image or name is undefine");
    //   setSnackBarStatus("error")
    //   setTimeout(() => {
    //     setOpenSnackbar(true);
    //   }, 1000);
    // }else{
    //     dispatch(AddBranchesState({ image,partner }));
    //     setSnackBarText("partner added successfully");
    //     setSnackBarStatus("success")
    //   setTimeout(() => {
    //     setOpenSnackbar(true);
    //   }, 1000);
    // }

    // handleCloseAddModel();
  };

  const deleteCurrentBranch = async (branchId, active) => {
    dispatch(
      DeleteBranchesState({
        branchId,
        active: active,
      })
    );
    // handleCloseConfirmedDialog();
  };

  const handleEdit = (id) => {
    // Implement edit logic here
    console.log("Edit branch with id:", id);
  };

  useEffect(() => {
    dispatch(GetBranchesState());
  }, [dispatch]);
  return (
    <>
      {!BranchSelector.isLoading ? (
        <Container>
          <Typography variant="h4" gutterBottom>
            Restaurant Chains
          </Typography>
          <BranchesList
            branches={branches}
            deleteCurrentBranch={deleteCurrentBranch}
            handleEdit={handleEdit}
            branchUpdate={BranchSelector.branchUpdate}
          />
        </Container>
      ) : (
        <CenteredCircularProgress />
      )}
      <AddModal  snackBarText={BranchSelector.snackBarMessage}
        snackBarStatus={BranchSelector.snackBarStatus}
        show={showAddModal}
        setShow={setShowAddModal}
        handleShowModel={handleShowAddModel}
        itemName={itemName}
        fun={addNewBranch}
        handleCloseModel={handleCloseAddModel}
        content={content}
        setContent={setContent} />
    </>
  );
};

export default Branches;
