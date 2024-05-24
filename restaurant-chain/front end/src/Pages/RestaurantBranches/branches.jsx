import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container, Typography } from "@mui/material";
import BranchesList from "./branchList";

import {
  GetBranchesState,
  EditBranchesState,
  DeleteBranchesState,
  AddBranchesState,
} from "../../Service/Redux/res_Branches";
const Branches = () => {
  const dispatch = useDispatch();

  const BranchSelector = useSelector((state) => {
    return state.branch;
  });

  const restaurantBranches = BranchSelector.branches?.filter((item) => {
    return item.active === 1;
  });

  console.log(restaurantBranches);

  const [branches, setBranches] = useState([
    {
      id: 1,
      name: "Branch 1",
      createdAt: "2023-01-01",
      location: "Location 1",
    },
    {
      id: 2,
      name: "Branch 2",
      createdAt: "2023-02-01",
      location: "Location 2",
    },
    {
      id: 2,
      name: "Branch 2",
      createdAt: "2023-02-01",
      location: "Location 2",
    },
    {
      id: 2,
      name: "Branch 2",
      createdAt: "2023-02-01",
      location: "Location 2",
    },
    {
      id: 2,
      name: "Branch 2",
      createdAt: "2023-02-01",
      location: "Location 2",
    },
    {
      id: 2,
      name: "Branch 2",
      createdAt: "2023-02-01",
      location: "Location 2",
    },
    {
      id: 2,
      name: "Branch 2",
      createdAt: "2023-02-01",
      location: "Location 2",
    },
    {
      id: 2,
      name: "Branch 2",
      createdAt: "2023-02-01",
      location: "Location 2",
    },
  ]);

  const handleDelete = (id) => {
    setBranches(branches.filter((branch) => branch.id !== id));
  };

  const handleEdit = (id) => {
    // Implement edit logic here
    console.log("Edit branch with id:", id);
  };

  useEffect(() => {
    dispatch(GetBranchesState());
  }, [dispatch]);
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Restaurant Chains
      </Typography>
      <BranchesList
        branches={branches}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </Container>
  );
};

export default Branches;
