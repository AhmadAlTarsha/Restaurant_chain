import React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
  Button,
  Typography
} from '@mui/material';
  import { styled } from '@mui/material/styles';
  import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontWeight: "bold",
}));
const BranchesList = ({ branches, deleteCurrentBranch, handleEdit }) => {
  console.log("==================================================");
  return (<>
  {branches?  <TableContainer component={Paper} sx={{ marginTop: 3 ,backgroundColor: 'lightgray'}}>
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
        {branches?.map((branch) => (
          <TableRow key={branch.id}>
            <TableCell>{branch.name}</TableCell>
            <TableCell>{branch.created_at}</TableCell>
            <TableCell>{branch.location}</TableCell>
            <TableCell align="center">
              <Tooltip title="Edit">
                <IconButton color="primary" onClick={() => handleEdit(branch.id)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton color="secondary" onClick={() =>{ deleteCurrentBranch(branch.id)}}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>:<Paper sx={{ padding: 3, marginTop: 3, backgroundColor: 'lightgray' }}>
          <Typography variant="h6" gutterBottom>
            There are no branches added yet.
          </Typography>
          <Button variant="contained" color="primary" onClick={() => {/* handle add branch logic */}}>
            Add Branch
          </Button>
        </Paper>}</>
  
  );
};

export default BranchesList;
