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
  Checkbox,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

const BranchesAndMenus = () => {
  const [targetMenu, setTargetMenu] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedMenuItems, setSelectedMenuItems] = useState([]);

  const BranchSelector = useSelector((state) => {
    return state.branch;
  });

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
    setSelectedMenuItems([]);
  };

  const handleMenuSelect = (menuId) => {
    setSelectedMenuItems((prevSelected) => {
      const isSelected = prevSelected.some(
        (item) => item.branchId === selectedBranch && item.menuId === menuId
      );

      if (isSelected) {
        return prevSelected.filter(
          (item) =>
            !(item.branchId === selectedBranch && item.menuId === menuId)
        );
      } else {
        return [...prevSelected, { branchId: selectedBranch, menuId }];
      }
    });
  };

  const handleAddItemsToBranches =async () => {
    if (selectedBranch && selectedMenuItems.length > 0) {
   
dispatch()

    }
  };

  return (
    <Container style={{ marginTop: "32px" }}>
      <Typography variant="h4" gutterBottom style={{ marginBottom: "16px" }}>
        Branches Menu
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
                      <Checkbox
                        checked={selectedMenuItems.some(
                          (item) =>
                            item.branchId === selectedBranch &&
                            item.menuId === menu.id
                        )}
                        onChange={() => handleMenuSelect(menu.id)}
                      />
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
