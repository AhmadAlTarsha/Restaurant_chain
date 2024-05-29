import { createBrowserRouter } from "react-router-dom";
import React from "react";

import Branches from "../Pages/RestaurantBranches/branches";
import Admin from "../Pages/Admin/admin";

import Main from "../Layouts";
import Menu from "../Pages/Menu/index";
import BranchesMenus from "../Pages/Restaurant_Menu";
import BranchOpeningHours from "../Pages/branch_opining_time";
import BranchMaintenance from "../Pages/Branches_maintenances";
import Data from "../Pages/Data";

import RestaurantBranches from "../Pages/branchPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "data",
        element: <Data />,
      },
      // {
      //   path: "data",
      //   element: <RestaurantBranches />,
      // },
      {
        path: "branches",
        element: <Branches />,
      },
      // {
      //   path: "admin",
      //   element: <Admin />,
      // },
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
      {
        path: "branches-maintenance",
        element: <BranchMaintenance />,
      },
    ],
  },
  {
    path: "/restaurant",
    element: <RestaurantBranches />,
  },
]);
