import React from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

// import MuiAppBar from '@mui/material/AppBar';

import CssBaseline from "@mui/material/CssBaseline";

import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar/SideBar";
const TopBar = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <SideBar
        open={open}
        handleDrawerClose={handleDrawerClose}
        theme={theme}
      />
      <Outlet/>
    </Box>
  );
};

export default TopBar;
