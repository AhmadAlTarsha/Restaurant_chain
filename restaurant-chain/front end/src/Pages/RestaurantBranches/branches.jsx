import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container, Typography } from "@mui/material";
import BranchesList from "./branchList";
import CenteredCircularProgress from "../../Components/Loader";
import AddModal from "../../Components/AddModal";

import {
  GetBranchesState,
  DeleteBranchesState,
} from "../../Service/Redux/res_Branches";
const Branches = () => {
  const itemName = "branch";
  // const [content, setContent] = useState("");


  // const [showAddModal, setShowAddModal] = useState(false);
  // const [openSnackbar, setOpenSnackbar] = useState(false);

  // const [snackBarText, setSnackBarText] = useState("");
  // const [snackBarStatus, setSnackBarStatus] = useState("");

  // const handleShowAddModel = () => setShowAddModal(true);
  // const handleCloseAddModel = () => setShowAddModal(false);
  const dispatch = useDispatch();

  const BranchSelector = useSelector((state) => {
    return state.branch;
  });

  const branches = BranchSelector.branches;
 
 

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
            BranchSelector={BranchSelector}
            itemName={itemName}
            
            // add={<AddModal/>}
          />
        </Container>
      ) : (
        <CenteredCircularProgress />
      )}
   
    </>
  );
};

export default Branches;
