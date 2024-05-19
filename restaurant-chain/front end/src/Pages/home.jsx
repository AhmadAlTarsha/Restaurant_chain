import React ,{useState} from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

// import MuiAppBar from '@mui/material/AppBar';

import CssBaseline from "@mui/material/CssBaseline";

import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar/SideBar";
const TopBar = () => {
 
  const [open, setOpen] = useState(false);

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
      
      />
      <Outlet/>
    </Box>
  );
};

export default TopBar;
