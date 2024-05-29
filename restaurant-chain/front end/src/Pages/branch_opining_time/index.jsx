
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

import { GetBranchesState } from "../../Service/Redux/res_Branches";
import { AddTimeToBranchState } from "../../Service/Redux/branch_opining_hours";

const BranchOpeningHours = () => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [openingHours, setOpeningHours] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const BranchSelector = useSelector((state) => state.branch);
  const branches = BranchSelector.branches;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetBranchesState());
  }, [dispatch]);

  const handleBranchSelect = (branchId) => {
    setSelectedBranch(branchId);
    setOpeningHours([]); // Reset opening hours when changing branch
  };

  const handleTimeChange = (day, type, value) => {
    setOpeningHours((prevHours) => {
      const existingDay = prevHours.find((hour) => hour.day === day);
      if (existingDay) {
        return prevHours.map((hour) =>
          hour.day === day ? { ...hour, [type]: value } : hour
        );
      } else {
        return [...prevHours, { branch_id: selectedBranch, day, [type]: value }];
      }
    });
  };

  const handleSubmit = () => {
    for (let index = 0; index < openingHours.length; index++) {
      if (openingHours[index].close === undefined || openingHours[index].open === undefined) {
        setSnackbarMessage("Error: Some data is missing");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
    }

    dispatch(AddTimeToBranchState({ openingHours }));
    setSnackbarMessage("Opening hours added successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container style={{ marginTop: "32px" }}>
      <Typography variant="h4" gutterBottom style={{ marginBottom: "16px" }}>
        Branch Opening Hours
      </Typography>
      <Grid container spacing={4} style={{ display: "flex", justifyContent: "space-between" }}>
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
                  Set Opening Hours for{" "}
                  {branches.find((b) => b.id === selectedBranch)?.name}
                </Typography>
                <List style={{ maxHeight: "300px", overflow: "auto" }}>
                  {daysOfWeek.map((day) => (
                    <ListItem key={day} style={{ display: "flex", justifyContent: "space-between" }}>
                      <ListItemText primary={day} />
                      <FormControl style={{ minWidth: 120, marginRight: "16px" }}>
                        <InputLabel>Open</InputLabel>
                        <Select
                          value={
                            openingHours.find((hour) => hour.day === day)?.open ||
                            ""
                          }
                          onChange={(e) => handleTimeChange(day, "open", e.target.value)}
                        >
                          {[...Array(12)].map((_, i) => (
                            <MenuItem key={`open-${i + 1}AM`} value={`${i + 1}AM`}>
                              {`${i + 1}AM`}
                            </MenuItem>
                          ))}
                          {[...Array(12)].map((_, i) => (
                            <MenuItem key={`open-${i + 1}PM`} value={`${i + 1}PM`}>
                              {`${i + 1}PM`}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl style={{ minWidth: 120 }}>
                        <InputLabel>Close</InputLabel>
                        <Select
                          value={
                            openingHours.find((hour) => hour.day === day)?.close ||
                            ""
                          }
                          onChange={(e) => handleTimeChange(day, "close", e.target.value)}
                        >
                          {[...Array(12)].map((_, i) => (
                            <MenuItem key={`close-${i + 1}AM`} value={`${i + 1}AM`}>
                              {`${i + 1}AM`}
                            </MenuItem>
                          ))}
                          {[...Array(12)].map((_, i) => (
                            <MenuItem key={`close-${i + 1}PM`} value={`${i + 1}PM`}>
                              {`${i + 1}PM`}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              style={{ marginTop: "16px" }}
            >
              Submit Opening Hours
            </Button>
          </Grid>
        )}
      </Grid>

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

export default BranchOpeningHours;
