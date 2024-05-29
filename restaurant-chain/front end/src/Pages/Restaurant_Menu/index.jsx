import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  Snackbar,
  Alert,
} from "@mui/material";
import { GetBranchesState } from "../../Service/Redux/res_Branches";
import { GetMenuState } from "../../Service/Redux/Menu";
import { AddMenuToBranchState } from "../../Service/Redux/res_bra_menu";

const BranchesAndMenus = () => {
  const [targetMenu, setTargetMenu] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedMenuItems, setSelectedMenuItems] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const BranchSelector = useSelector((state) => state.branch);
  const allMenu = useSelector((state) =>
    state.menu.menu.filter((item) => item.active === 1)
  );

  const branches = BranchSelector.branches;
  const dispatch = useDispatch();

  const handleBranchSelect = (branch_id) => {
    const branchMenu =
      branches.find((branch) => branch.id === branch_id)?.Branch_Menu || [];
    const result = allMenu.filter((item) => !branchMenu.includes(item.name));

    setTargetMenu(result);
    setSelectedBranch(branch_id);
    setSelectedMenuItems([]);
  };

  const handleMenuSelect = (menu_id) => {
    setSelectedMenuItems((prevSelected) => {
      const isSelected = prevSelected.some(
        (item) => item.branch_id === selectedBranch && item.menu_id === menu_id
      );

      if (isSelected) {
        return prevSelected.filter(
          (item) =>
            !(item.branch_id === selectedBranch && item.menu_id === menu_id)
        );
      } else {
        return [...prevSelected, { branch_id: selectedBranch, menu_id }];
      }
    });
  };

  const handleAddItemsToBranches = () => {
    if (!selectedBranch) return;

    if (selectedMenuItems.length > 0) {
      dispatch(AddMenuToBranchState({ selectedMenuItems }));
      setSnackbarMessage("Menus added to the branch successfully!");
      setSnackbarSeverity("success");
    } else {
      setSnackbarMessage("No menu items selected");
      setSnackbarSeverity("error");
    }
    setSnackbarOpen(true);
  };

  useEffect(() => {
    dispatch(GetBranchesState());
    dispatch(GetMenuState());
  }, [dispatch]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
                            item.branch_id === selectedBranch &&
                            item.menu_id === menu.id
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BranchesAndMenus;
