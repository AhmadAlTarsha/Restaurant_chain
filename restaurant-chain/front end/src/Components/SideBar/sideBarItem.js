
import React from 'react';

import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';

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
    {
      icon: <MenuBookOutlinedIcon/>,
      label: "branches Menu",
      path: "/branches-menu",
    },
    {
      icon: <QueryBuilderOutlinedIcon/>,
      label: "branches Opining",
      path: "/branches-opining-hours",
    },
    {
      icon: <HandymanOutlinedIcon/>,
      label: "branches maintenance",
      path: "/branches-maintenance",
    },
  ];