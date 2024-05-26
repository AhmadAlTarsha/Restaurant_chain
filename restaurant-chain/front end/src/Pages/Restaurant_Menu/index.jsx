import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Button,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { styled } from '@mui/system';

const useStyles = styled((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  card: {
    marginBottom: theme.spacing(2),
  },
  list: {
    maxHeight: 300,
    overflow: 'auto',
  },
  button: {
    marginTop: theme.spacing(2),
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}));

const BranchesAndMenus = () => {
  const classes = useStyles();
  const [branches, setBranches] = useState([]);
  const [menus, setMenus] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [selectedMenus, setSelectedMenus] = useState([]);

  useEffect(() => {
    // Fetch branches and menus from API (replace with your actual API calls)
    setBranches([
      { id: 1, name: 'Branch 1' },
      { id: 2, name: 'Branch 2' },
      { id: 3, name: 'Branch 3' },
    ]);
    setMenus([
      { id: 1, name: 'Menu 1' },
      { id: 2, name: 'Menu 2' },
      { id: 3, name: 'Menu 3' },
    ]);
  }, []);

  const handleBranchToggle = (branchId) => {
    setSelectedBranches((prevSelected) =>
      prevSelected.includes(branchId)
        ? prevSelected.filter((id) => id !== branchId)
        : [...prevSelected, branchId]
    );
  };

  const handleMenuToggle = (menuId) => {
    setSelectedMenus((prevSelected) =>
      prevSelected.includes(menuId)
        ? prevSelected.filter((id) => id !== menuId)
        : [...prevSelected, menuId]
    );
  };

  const handleAddItemsToBranches = () => {
    // Implement the logic to add selected items to selected branches
    console.log('Selected Branches:', selectedBranches);
    console.log('Selected Menus:', selectedMenus);
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h4" gutterBottom className={classes.title}>
        Restaurant Chain Management
      </Typography>
      <Grid container spacing={4} className={classes.gridContainer}>
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Select Branches
              </Typography>
              <List className={classes.list}>
                {branches.map((branch) => (
                  <ListItem key={branch.id} button onClick={() => handleBranchToggle(branch.id)}>
                    <Checkbox checked={selectedBranches.includes(branch.id)} />
                    <ListItemText primary={branch.name} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Select Menus
              </Typography>
              <List className={classes.list}>
                {menus.map((menu) => (
                  <ListItem key={menu.id} button onClick={() => handleMenuToggle(menu.id)}>
                    <Checkbox checked={selectedMenus.includes(menu.id)} />
                    <ListItemText primary={menu.name} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddItemsToBranches}
        className={classes.button}
      >
        Add Items to Selected Branches
      </Button>
    </Container>
  );
};

export default BranchesAndMenus;
