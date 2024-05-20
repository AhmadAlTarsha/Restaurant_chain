import { createBrowserRouter } from "react-router-dom";
import React from "react";

import Branches from "../Pages/branches";
import Admin from "../Pages/Admin/admin";

import Main from "../Layouts";

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
    ],
  },
]);
