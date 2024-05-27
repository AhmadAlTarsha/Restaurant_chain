import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GetBranchesState } from "../../Service/Redux/res_Branches";
import { GetMenuState } from "../../Service/Redux/Menu";

import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Radio,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

const BranchesAndMenus = () => {
  const [targetMenu, setTargetMenu] = useState([]);
 
  const [selectedBranch, setSelectedBranch] = useState(null);

  const BranchSelector = useSelector((state) => {
    return state.branch;
  });
  //   const menuSelector = useSelector((state) => {
  //     return state.menu;
  //   });

  //   const allMenu = menuSelector.menu.filter((item) => {
  //     return item.active === 1;
  //   });
  //   const a = allMenu.map((item) => {
  //     return item.name;
  //   });
  const allMenu = useSelector((state) =>
    state.menu.menu.filter((item) => item.active === 1).map((item) => item)
  );



  const branches = BranchSelector.branches;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetBranchesState());
    dispatch(GetMenuState());
  }, [dispatch]);

  const handleBranchSelect = (branchId) => {
    const branchMenu =
      branches
        .filter((branch) => branch.id === branchId)
        .map((branch) => branch.Branch_Menu)[0] || [];
   
    const result = allMenu.filter((item) => !branchMenu.includes(item.name));

   
    setTargetMenu(result);
    setSelectedBranch(branchId);
  };

  const handleAddItemsToBranches = () => {
    // // Implement the logic to add selected items to selected branch
    // console.log("Selected Branch:", selectedBranch);
  };

  return (
    <Container style={{ marginTop: "32px" }}>
      <Typography variant="h4" gutterBottom style={{ marginBottom: "16px" }}>
        branches menu
      </Typography>
      <Grid
        container
        spacing={4}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Grid item xs={12} md={6}>
          <Card style={{ marginBottom: "16px" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Select Branch
              </Typography>
              <List style={{ maxHeight: "300px", overflow: "auto" }}>
                {branches.map((branch) => (
                  <ListItem
                    key={branch.id}
                    button
                    onClick={() => handleBranchSelect(branch.id)}
                    style={
                      selectedBranch === branch.id
                        ? { backgroundColor: "#3f51b5", color: "#fff" }
                        : {}
                    }
                  >
                    <Radio
                      checked={selectedBranch === branch.id}
                      onChange={() => handleBranchSelect(branch.id)}
                      value={branch.id}
                      name="radio-button-demo"
                      inputProps={{ "aria-label": branch.name }}
                    />
                    <ListItemText primary={branch.name} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {selectedBranch && (
          <Grid item xs={12} md={6}>
            <Card style={{ marginBottom: "16px" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Select Menus for{" "}
                  {branches.find((b) => b.id === selectedBranch)?.name}
                </Typography>
                <List style={{ maxHeight: "300px", overflow: "auto" }}>
                  {targetMenu.map((menu) => (
                    <ListItem key={menu.id}>
                      <ListItemText primary={menu.name} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      {selectedBranch && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddItemsToBranches}
          style={{ marginTop: "16px" }}
        >
          Add Items to Selected Branch
        </Button>
      )}
    </Container>
  );
};

export default BranchesAndMenus;
