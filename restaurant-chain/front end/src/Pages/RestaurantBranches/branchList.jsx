import React from "react";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, IconButton, Tooltip
  } from '@mui/material';
  import { styled } from '@mui/material/styles';
  import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontWeight: "bold",
}));
const BranchesList = ({ branches, handleDelete, handleEdit }) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: 3 }}>
    <Table aria-label="branches table">
      <TableHead>
        <TableRow>
          <StyledTableCell>Branch Name</StyledTableCell>
          <StyledTableCell>Created At</StyledTableCell>
          <StyledTableCell>Location</StyledTableCell>
          <StyledTableCell align="center">Actions</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {branches.map((branch) => (
          <TableRow key={branch.id}>
            <TableCell>{branch.name}</TableCell>
            <TableCell>{branch.createdAt}</TableCell>
            <TableCell>{branch.location}</TableCell>
            <TableCell align="center">
              <Tooltip title="Edit">
                <IconButton color="primary" onClick={() => handleEdit(branch.id)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton color="secondary" onClick={() => handleDelete(branch.id)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
};

export default BranchesList;
