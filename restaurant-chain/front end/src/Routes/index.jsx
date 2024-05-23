import { createBrowserRouter } from "react-router-dom";
import React from "react";

import Branches from "../Pages/RestaurantBranches/branches";
import Admin from "../Pages/Admin/admin";

import Main from "../Layouts";
import Menu from "../Pages/Menu/index";

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
    ],
  },
]);
