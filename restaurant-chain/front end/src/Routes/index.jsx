import { createBrowserRouter } from "react-router-dom";

import Main from "../layout";
import Branches from "../Pages/branches";
import Admin from "../Pages/admin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/branches",
        element:<Branches/>
      },
      {
        path: "/admin",
        element:<Admin/>
      },
    ],
  },
]);
