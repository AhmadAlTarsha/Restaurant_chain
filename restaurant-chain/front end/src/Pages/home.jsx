import React ,{useState,useMemo} from "react";
import { createTheme,ThemeProvider } from "@mui/material";
import getDesignTokens from "../Theme/index"
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

// import MuiAppBar from '@mui/material/AppBar';

import CssBaseline from "@mui/material/CssBaseline";

import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar/SideBar";
const TopBar = () => {
  const [mode, setMode] = useState(localStorage.getItem("mode")||"light");
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
       <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavBar open={open} handleDrawerOpen={handleDrawerOpen} setMode={setMode} mode={mode}  />
      <SideBar
        open={open}
        handleDrawerClose={handleDrawerClose}
      
      />
      <Outlet/>
    </Box>
    </ThemeProvider>
  
  );
};

export default TopBar;
