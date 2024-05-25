import React from "react";

import { styled } from "@mui/material/styles";

import MuiAppBar from "@mui/material/AppBar";
import { Toolbar, Box } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const NavBar = ({ handleDrawerOpen, open ,setMode ,mode }) => {
  const theme=useTheme()
  const drawerWidth = 240;
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Abu Jbara Restaurant chain
        </Typography>
        <Box flexGrow={1} />
        {theme.palette.mode==="dark"?<IconButton  onClick={async()=>{
       await   setMode((prevMode) =>
            prevMode === 'light' ? 'dark' : 'light',
       localStorage.setItem("mode",theme.palette.mode==="light"?"dark":"light")
          );
        }} color="inherit">
        <LightModeOutlinedIcon /> 
        </IconButton>:<IconButton onClick={async()=>{
        await  setMode((prevMode) =>
            prevMode === 'light' ? 'dark' : 'light',
        localStorage.setItem("mode",theme.palette.mode==="dark"?"light":"dark")
          );
        }}  color="inherit">
        <DarkModeOutlinedIcon /> 
        </IconButton>}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
