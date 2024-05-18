import { createBrowserRouter } from "react-router-dom";

import Main from "../layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "",
        element:""
      },
    ],
  },
]);
