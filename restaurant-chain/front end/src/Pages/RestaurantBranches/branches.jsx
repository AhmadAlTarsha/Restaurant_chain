import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container, Typography } from "@mui/material";
import BranchesList from "./branchList";
import CenteredCircularProgress from "../../Components/Loader";

import { GetBranchesState } from "../../Service/Redux/res_Branches";
const Branches = () => {
  const itemName = "branch";

  const dispatch = useDispatch();

  const BranchSelector = useSelector((state) => {
    return state.branch;
  });

  const branches = BranchSelector.branches;

  // !-----------------------------------------------------------side effect
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
            branchUpdate={BranchSelector.branchUpdate}
            BranchSelector={BranchSelector}
            itemName={itemName}
          />
        </Container>
      ) : (
        <CenteredCircularProgress />
      )}
    </>
  );
};

export default Branches;
