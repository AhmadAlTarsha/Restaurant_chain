import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";


import { GetBranchesState } from "../../Service/Redux/res_Branches";

import  {GetMenuState} from "../../Service/Redux/Menu";


import  {GetMaintenanceToBranchState} from "../../Service/Redux/branch_maintenance";

const Data = () => {
  const dispatch = useDispatch();

  const branchesMaintenanceSelector=useSelector((state)=>{
    return state.branchesMaintenance.branchesMaintenance
  })
console.log(branchesMaintenanceSelector?.length);
  const BranchSelector = useSelector((state) => {
    return state.branch.branches;
  });

  const activeBranches=BranchSelector?.filter((branch)=>{
    return branch.active===1
  })




  const MenuSelector = useSelector((state) => state.menu.menu);

const activeMenuItem=MenuSelector?.filter((item)=>{
  return item.active===1
})
  useEffect(() => {
    dispatch(GetBranchesState());
  
    dispatch(GetMenuState());
    dispatch(GetMaintenanceToBranchState());
  }, [dispatch]);

 

  return (
    <Container style={{ marginTop: "32px" }}>
      <Typography variant="h4" gutterBottom style={{ marginBottom: "16px" }}>
        Admin Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              backgroundColor: "#1976d2",
              color: "#fff",
              borderRadius: "8px",
              boxShadow: 3,
            }}
          >
            <CardHeader title="Total Branches" />
            <CardContent>
              <Typography variant="h5">{activeBranches?.length||"their is no branch yet !"}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              backgroundColor: "#d32f2f",
              color: "#fff",
              borderRadius: "8px",
              boxShadow: 3,
            }}
          >
            <CardHeader title="Branches in Maintenance" />
            <CardContent>
              <Typography variant="h5">{branchesMaintenanceSelector?.length||"their is no branch in Maintenance yet !"}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              backgroundColor: "#388e3c",
              color: "#fff",
              borderRadius: "8px",
              boxShadow: 3,
            }}
          >
            <CardHeader title="Total Menu Items" />
            <CardContent>
              <Typography variant="h5">{activeMenuItem?.length||"their is no menu item yet !"}</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Add more cards here as needed */}
      </Grid>
    </Container>
  );
};

export default Data;
