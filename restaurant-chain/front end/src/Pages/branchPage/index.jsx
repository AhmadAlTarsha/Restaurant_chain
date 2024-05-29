import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  AppBar,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Button,
  Modal,
  Box,
} from "@mui/material";
import { GetBranchesState } from "../../Service/Redux/res_Branches";
import logo from "../../assets/images/images.png";

const RestaurantBranches = () => {
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branch.branches);
  console.log(branches);
  const restaurantName = "B.laban"; // Replace with your actual restaurant name or fetch it dynamically if needed
  const [modalOpen, setModalOpen] = useState(false);
  const [modalBranch, setModalBranch] = useState(null);

  useEffect(() => {
    dispatch(GetBranchesState());
  }, [dispatch]);

  const handleExpand = (branch) => {
    setModalBranch(branch);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalBranch(null);
  };

  return (
    <Container style={{ marginTop: "32px" }}>
      <AppBar position="static" style={{ marginBottom: "16px", backgroundColor: "#800080" }}>
        <Tabs indicatorColor="secondary" textColor="inherit">
          <Tab label={restaurantName} />
          <Tab label="Contacts" />
          <Tab label="Who We Are" />
        </Tabs>
      </AppBar>
      <Typography variant="h4" gutterBottom style={{ marginBottom: "16px", color: "#303f9f" }}>
        Our Branches
      </Typography>
      <Grid container spacing={4}>
        {branches?.map((branch) => (
          <Grid item xs={12} md={4} key={branch.id}>
            <Card
              style={{
                marginBottom: "16px",
                border: "1px solid #ddd",
                backgroundColor: "#fff",
                cursor: "pointer",
              }}
              onClick={() => handleExpand(branch)}
            >
              <CardContent>
                <img
                  src={logo}
                  alt={branch.name}
                  style={{
                    width: "100%",
                    maxWidth: "150px",
                    height: "auto",
                    marginBottom: "8px",
                    borderRadius: "8px",
                  }}
                />
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{
                    color: "#3f51b5",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                >
                  {branch.name}
                </Typography>
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{
                    color: "#3f51b5",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Phone: {branch.phone}
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{ color: "#757575", fontSize: "1rem" }}
                >
                  Location: {branch.street_name}, Amman
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{ color: "#757575", fontSize: "1rem" }}
                >
                  Maintenance Status:{" "}
                  <span style={{ color: "#f44336", fontSize: "1rem" }}>
                    {branch?.BranchesMaintenances?.length>=1 ? "Yes" : "No"}
                  </span>
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  style={{ marginTop: "8px" }}
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
     
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="branch-details"
        aria-describedby="detailed-branch-information"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            style={{ color: "#3f51b5", fontSize: "1.5rem", fontWeight: "bold" }}
          >
            {modalBranch?.name}
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            style={{ color: "#757575", fontSize: "1rem" }}
          >
            Location: {modalBranch?.street_name}, Amman
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            style={{ color: "#757575", fontSize: "1rem" }}
          >
            Maintenance Status:{" "}
            <span style={{ color: "#f44336", fontSize: "1rem" }}>
              {modalBranch?.BranchesMaintenances[0]?.Maintenance?.name
                ? `Yes (${modalBranch?.BranchesMaintenances[0]?.Maintenance?.name})    from ${modalBranch?.BranchesMaintenances[0]?.from_date} to ${modalBranch?.BranchesMaintenances[0]?.to_date}`
                : "No Maintenance in this Branch Yet"}
            </span>
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            style={{ color: "#757575", fontSize: "1rem" }}
          >
            Working Hours:
          </Typography>
          <List>
            {modalBranch?.branchOpining.map((hour) => (
              <ListItem key={hour.day}>
                <ListItemText
                  primary={`${hour.day}: ${hour.open} - ${hour.close}`}
                  style={{ color: "#757575", fontSize: "1rem" }}
                />
              </ListItem>
            ))}
          </List>
          <Typography
            variant="body1"
            gutterBottom
            style={{ color: "#757575", fontSize: "1rem" }}
          >
            Menu:
          </Typography>
          <List>
            {modalBranch?.Branch_Menu.map((menuItem) => (
              <ListItem key={menuItem.id}>
                <ListItemText
                  primary={menuItem}
                  style={{ color: "#4caf50", fontSize: "1rem" }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>
    </Container>
  );
};

export default RestaurantBranches;
