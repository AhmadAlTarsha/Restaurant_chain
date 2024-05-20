//!---react import
import React from "react";
//!mui import
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Box, Typography, IconButton } from "@mui/material";
import {
  AdminPanelSettingsOutlined,
  PersonOutlineOutlined,
  ManageAccountsOutlined,

} from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from "@mui/material";
//!file import
import { rows } from "./admin-data";

const Admin = () => {
  const theme = useTheme();

  const columns = [
    {
      field: "col1",
      headerName: "Name",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "col2",
      headerName: "userName",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "col3",
      headerName: "phone",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "col4",
      headerName: "governate",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "col6",
      headerName: "created at",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "col7",
      headerName: "edit",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: () => {
        return (
          <IconButton color="primary">
            <EditIcon />
          </IconButton>
        );
      },
    },
    {
      field: "col8",
      headerName: "delete",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: () => {
        return (
          <IconButton color="secondary">
            <DeleteIcon />
          </IconButton>
        );
      },
    },
    {
      field: "col5",
      headerName: "role",
      renderCell: ({ row: { col5 } }) => {
        return (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              width: "100px",
              p: "5px",
              borderRadius: "3px",
              bgcolor:
                col5 === "admin"
                  ? theme.palette.primary.dark
                  : col5 === "user"
                  ? theme.palette.error.dark
                  : theme.palette.secondary.dark,
            }}
          >
            {col5 === "admin" ? (
              <AdminPanelSettingsOutlined
                sx={{ color: "white" }}
                fontSize="small"
              />
            ) : col5 === "user" ? (
              <PersonOutlineOutlined
                sx={{ color: "white" }}
                fontSize="small"
              />
            ) : (
              <ManageAccountsOutlined
                sx={{ color: "white" }}
                fontSize="small"
              />
            )}
            <Typography sx={{ fontSize: "13px", color: "white", ml: 1 }}>
              {col5}
            </Typography>
          </Box>
        );
      },
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
  ];

  return (
    <Box sx={{ height: 600, width: "100%", mx: "auto" }}>
      <Typography
        component="h3"
        variant="h6"
        sx={{ textAlign: "center", py: 3 }}
      >
        Manage Admins
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{
          '& .MuiDataGrid-cell': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      />
    </Box>
  );
};

export default Admin;
