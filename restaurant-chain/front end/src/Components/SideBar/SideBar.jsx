import React from "react";
// import {  } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import { Outlet ,useLocation,useNavigate} from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import { drawerItem } from "./sideBarItem";

import List from "@mui/material/List";

import {Avatar,Typography} from "@mui/material/";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { grey } from "@mui/material/colors";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SideBar = ({ open, handleDrawerClose }) => {
  let location=useLocation()
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      {" "}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Avatar
        sx={{
          transition: "0.6s",
          mx: "auto",
          width: !open ? 44 : 88,
          height: !open ? 44 : 88,
          my: 1,
          border: "2px solid gray",
        }}
        alt="Remy Sharp"
        src="../../assets/images/avatar_2.jpg"
      />
      <Typography
        align="center"
        sx={{ transition: "0.6s", fontSize: open ? 17 : 0 }}
      >
        Eng.Odeh
      </Typography>
      <Typography
        align="center"
        sx={{
          transition: "0.6s",
          fontSize: open ? 17 : 0,
          color: theme.palette.info.main,
        }}
        color="inherit"
      >
        Manager
      </Typography>
        <Divider />
        <List>
          {drawerItem?.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                sx={{
                  py: 0,
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  bgcolor:
              location.pathname === item.path
                ? theme.palette.mode === "dark"
                  ? grey[800]
                  : grey[300]
                : null,
                }}
                onClick={() => {
                  navigate(item.path);
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                  onClick={() => {}}
                >
                  {item?.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item?.label}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <Outlet />
      </Box>
    </>
  );
};

export default SideBar;
