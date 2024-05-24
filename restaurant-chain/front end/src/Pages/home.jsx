import React ,{useState,useMemo} from "react";
import { createTheme,ThemeProvider } from "@mui/material";
import getDesignTokens from "../Theme/index"
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

// import MuiAppBar from '@mui/material/AppBar';

import CssBaseline from "@mui/material/CssBaseline";

import NavBar from "../Components/NavBar/NavBar";
import SideBar from "../Components/SideBar/SideBar";
const Home = () => {
  const [mode, setMode] = useState(localStorage.getItem("mode")||"light");
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const [open, setOpen] = useState(false);
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
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
     <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

     <Outlet/>
      </Box>
    </Box>
    </ThemeProvider>
  
  );
};

export default Home;
