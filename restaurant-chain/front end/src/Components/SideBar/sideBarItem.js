
import React from 'react';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';

import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';


export const drawerItem = [
   
    { icon:<AccountTreeOutlinedIcon/>,  label: "branches", path: "/branches" },
    {
      icon: <AdminPanelSettingsOutlinedIcon/>,
      label: "Admins",
      path: "/admin",
    },
    {
      icon: <RestaurantMenuOutlinedIcon/>,
      label: "Menu",
      path: "/menu",
    },
  ];