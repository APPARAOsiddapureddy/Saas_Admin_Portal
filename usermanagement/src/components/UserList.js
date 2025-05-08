import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  Button, TextField, MenuItem, Select, FormControl, InputLabel, IconButton,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, 
  Chip, Grid, Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  title: {
    textAlign:'center',
    flexGrow: 1,
  },
  table: {
    minWidth: 650,
  },
  filters: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: '#f5f5f5',
  },
  filterItem: {
    marginRight: theme.spacing(2),
  },
  statusActive: {
    backgroundColor: '#4caf50',
    color: 'white',
  },
  statusInactive: {
    backgroundColor: '#f44336',
    color: 'white',
  },
  statusPending: {
    backgroundColor: '#ff9800',
    color: 'white',
  },
  actionButton: {
    marginRight: theme.spacing(1),
  },
  backButton: {
    marginBottom: theme.spacing(2),
  },
}));

const UserList = () => {
  const classes = useStyles();
  
  // Sample initial user data
  const initialUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'User', status: 'Pending' },
    { id: 5, name: 'Michael Brown', email: 'michael@example.com', role: 'User', status: 'Active' },
  ];


const [users, setUsers] = useState([]); // Initialize as empty array
const [filteredUsers, setFilteredUsers] = useState([]); // Initialize as empty array

useEffect(() => {
  // Try to get users from localStorage
  const storedUsers = localStorage.getItem('users');
  
  if (storedUsers) {
    // If users exist in localStorage, use them
    const localUsers = JSON.parse(storedUsers);
    setUsers(localUsers);
    setFilteredUsers(localUsers); // Also set filtered users
  } else {
    // If no users in localStorage, use initial sample data
    setUsers(initialUsers);
    setFilteredUsers(initialUsers); // Also set filtered users
    
    // Save initial users to localStorage
    localStorage.setItem('users', JSON.stringify(initialUsers));
  }
}, []);
  const [filters, setFilters] = useState({
    search: '',
    role: '',
    status: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Apply filters whenever filters or users change
  useEffect(() => {
    const filtered = users.filter(user => {
      const matchSearch = user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                          user.email.toLowerCase().includes(filters.search.toLowerCase());
      const matchRole = filters.role === '' || user.role === filters.role;
      const matchStatus = filters.status === '' || user.status === filters.status;
      
      return matchSearch && matchRole && matchStatus;
    });
    
    setFilteredUsers(filtered);
  }, [filters, users]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
   // Filter out the deleted user
  const updatedUsers = users.filter(user => user.id !== userToDelete.id);
  
  // Update state
  setUsers(updatedUsers);
  
  // Save to localStorage
  localStorage.setItem('users', JSON.stringify(updatedUsers));
  
  // Close dialog
  setDeleteDialogOpen(false);
  };

  const handleBackToDashboard = () => {
    window.history.pushState({}, '', '/dashboard');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const getStatusChip = (status) => {
    switch(status) {
      case 'Active':
        return <Chip label="Active" className={classes.statusActive} size="small" />;
      case 'Inactive':
        return <Chip label="Inactive" className={classes.statusInactive} size="small" />;
      case 'Pending':
        return <Chip label="Pending" className={classes.statusPending} size="small" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  return (
    <div className={classes.root}>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleBackToDashboard}
        className={classes.backButton}
        startIcon={<span>←</span>}
      >
        Back to Dashboard
      </Button>

      <div className={classes.header}>
        <Typography variant="h4" className={classes.title}>
          User Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={Link}
          to="/userform"
        >
          Add New User
        </Button>
      </div>

      <Paper>
        <div className={classes.header} style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <SearchIcon style={{ marginRight: '8px' }} />
            <TextField
              label="Search users"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              variant="outlined"
              size="small"
            />
          </div>
          <Button
            startIcon={<FilterListIcon />}
            onClick={() => setShowFilters(!showFilters)}
            color="primary"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        {showFilters && (
          <div className={classes.filters}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl variant="outlined" size="small" fullWidth>
                  <InputLabel id="role-filter-label">Role</InputLabel>
                  <Select
                    labelId="role-filter-label"
                    name="role"
                    value={filters.role}
                    onChange={handleFilterChange}
                    label="Role"
                  >
                    <MenuItem value="">All Roles</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="User">User</MenuItem>
                    <MenuItem value="Editor">Editor</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl variant="outlined" size="small" fullWidth>
                  <InputLabel id="status-filter-label">Status</InputLabel>
                  <Select
                    labelId="status-filter-label"
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    label="Status"
                  >
                    <MenuItem value="">All Statuses</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </div>
        )}

        <TableContainer>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell component="th" scope="row">
                      <Link to={`/user/${user.id}`}>{user.name}</Link>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{getStatusChip(user.status)}</TableCell>
                    <TableCell align="right">
                      <IconButton 
                        component={Link} 
                        to={`/user/${user.id}/edit`}
                        color="primary" 
                        className={classes.actionButton}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        color="secondary" 
                        onClick={() => handleDeleteClick(user)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No users found matching your criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {userToDelete?.name}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserList;