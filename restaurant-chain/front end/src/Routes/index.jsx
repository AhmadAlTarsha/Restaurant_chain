import { createBrowserRouter } from "react-router-dom";
import React from "react";

import Branches from "../Pages/RestaurantBranches/branches";
import Admin from "../Pages/Admin/admin";

import Main from "../Layouts";
import Menu from "../Pages/Menu/index";
import BranchesMenus from "../Pages/Restaurant_Menu";
import BranchOpeningHours from "../Pages/branch_opining_time";

import { CssBaseline } from "@mui/material";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "branches",
        element: <Branches />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "branches-menu",
        element: <BranchesMenus />,
      },
      {
        path: "branches-opining-hours",
        element: <BranchOpeningHours />,
      },
    ],
  },
]);
