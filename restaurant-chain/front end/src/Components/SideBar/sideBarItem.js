
import React from 'react';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';

import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';


export const drawerItem = [
   
    { icon:<AccountTreeOutlinedIcon/>,  label: "branches", path: "/branches" },
    {
      icon: <AdminPanelSettingsOutlinedIcon/>,
      label: "Admins",
      path: "/admin",
    },
  ];