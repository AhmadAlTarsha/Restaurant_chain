import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
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
import { AddMaintenanceToBranchState, GetMaintenanceToBranchState } from "../../Service/Redux/branch_maintenance";

const BranchMaintenance = () => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [maintenanceEndDate, setMaintenanceEndDate] = useState("");
  const [comment, setComment] = useState("");
  const [shutdownType, setShutdownType] = useState("");
  const [price, setPrice] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  
  const maintenanceDate = new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD format

  const BranchSelector = useSelector((state) => state.branch);
  const branches = BranchSelector.branches;
  console.log(BranchSelector);
  const dispatch = useDispatch();


  const handleBranchSelect = (branchId) => {
    setSelectedBranch(branchId);
    setMaintenanceEndDate("");
    setComment("");
    setShutdownType("");
    setPrice("");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = () => {
    if (!maintenanceEndDate || !comment || !shutdownType || !price) {
      setSnackbarMessage("Please fill in all fields");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (maintenanceEndDate < today) {
      setSnackbarMessage("The maintenance end date cannot be in the past");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const maintenanceData = {
      branch_id: selectedBranch,
      from_date: maintenanceDate,
      to_date: maintenanceEndDate,
      comment,
      maintenance_id: shutdownType,
      price: `${price} JD`,
    };
    console.log(maintenanceData);
    dispatch(AddMaintenanceToBranchState({ maintenanceData }));
    
    setSnackbarMessage(BranchSelector.snackBarMessage );
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  useEffect(() => {
    dispatch(GetBranchesState());
    dispatch(GetMaintenanceToBranchState());
  }, [dispatch]);
  return (
    <Container style={{ marginTop: "32px" }}>
      <Typography variant="h4" gutterBottom style={{ marginBottom: "16px" }}>
        Branch Maintenance
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
                  Set Maintenance Details for{" "}
                  {branches.find((b) => b.id === selectedBranch)?.name}
                </Typography>
                <TextField
                  label="Maintenance Start Date"
                  type="date"
                  fullWidth
                  value={maintenanceDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                  style={{ marginBottom: "16px" }}
                />
                <TextField
                  label="Maintenance End Date"
                  type="date"
                  fullWidth
                  value={maintenanceEndDate}
                  onChange={(e) => setMaintenanceEndDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ marginBottom: "16px" }}
                />
                <TextField
                  label="Comment"
                  fullWidth
                  multiline
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{ marginBottom: "16px" }}
                />
                <FormControl fullWidth style={{ marginBottom: "16px" }}>
                  <InputLabel>Shutdown Type</InputLabel>
                  <Select
                    value={shutdownType}
                    onChange={(e) => setShutdownType(e.target.value)}
                  >
                    <MenuItem value={1}>Complete shutdown</MenuItem>
                    <MenuItem value={2}>Partial shutdown</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Price"
                  type="number"
                  fullWidth
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  style={{ marginBottom: "16px" }}
                />
              </CardContent>
            </Card>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              style={{ marginTop: "16px" }}
            >
              Submit Maintenance Details
            </Button>
          </Grid>
        )}
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BranchMaintenance;
