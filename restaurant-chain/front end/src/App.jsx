import React, { useMemo, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";
import { ThemeProvider, createTheme } from "@mui/material";
import getDesignTokens from "./Theme/index";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
