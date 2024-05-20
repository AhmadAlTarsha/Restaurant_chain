import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const BranchesList = ({ branches, handleDelete, handleEdit }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="branches table">
        <TableHead>
          <TableRow>
            <TableCell>Branch Name</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {branches.map((branch) => (
            <TableRow key={branch.id}>
              <TableCell>{branch.name}</TableCell>
              <TableCell>{branch.createdAt}</TableCell>
              <TableCell>{branch.location}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleEdit(branch.id)}>
                  Edit
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleDelete(branch.id)} style={{ marginLeft: '8px' }}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BranchesList;
