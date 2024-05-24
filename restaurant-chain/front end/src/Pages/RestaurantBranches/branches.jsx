import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container, Typography } from "@mui/material";
import BranchesList from "./branchList";
import CenteredCircularProgress from "../../Components/Loader";


import {
  GetBranchesState,
  DeleteBranchesState
} from "../../Service/Redux/res_Branches";
const Branches = () => {

  
  const dispatch = useDispatch();

  const BranchSelector = useSelector((state) => {
    return state.branch;
  });

  const branches = BranchSelector.branches
// console.log(branches);
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
  return (<>{!BranchSelector.isLoading? <Container>
      <Typography variant="h4" gutterBottom>
        Restaurant Chains
      </Typography>
      <BranchesList
        branches={branches}
        deleteCurrentBranch={deleteCurrentBranch}
        handleEdit={handleEdit}
        branchUpdate={BranchSelector.branchUpdate}
      />
    </Container>:<CenteredCircularProgress/>}</>
   
  );
};

export default Branches;
