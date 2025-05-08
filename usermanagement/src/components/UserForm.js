import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
  Typography,
  Snackbar
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(3),
  },
  formControl: {
    marginBottom: theme.spacing(2),
    minWidth: '100%',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(3),
  },
  backButton: {
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(3),
  },
}));

const UserForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const isEditing = !!id;
  
  // Sample user data for edit mode
  const sampleUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', department: 'IT', phone: '555-1234' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', department: 'Marketing', phone: '555-5678' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive', department: 'Sales', phone: '555-9012' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'User', status: 'Pending', department: 'HR', phone: '555-3456' },
    { id: 5, name: 'Michael Brown', email: 'michael@example.com', role: 'User', status: 'Active', department: 'Finance', phone: '555-7890' },
  ];

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: 'User',
    status: 'Active',
    department: '',
    phone: ''
  });
  
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Load user data if in edit mode
  useEffect(() => {
    if (isEditing) {
      const foundUser = sampleUsers.find(user => user.id === parseInt(id));
      
      if (foundUser) {
        setUserData(foundUser);
      } else {
        // User not found
        setSnackbar({
          open: true,
          message: 'User not found',
          severity: 'error'
        });
        history.push('/');
      }
    }
  }, [id, isEditing, history]);

  const validate = () => {
    const newErrors = {};
    
    if (!userData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!userData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!userData.role) {
      newErrors.role = 'Role is required';
    }
    
    if (!userData.status) {
      newErrors.status = 'Status is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
  if (validate()) {
    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    let updatedUsers;
    
    if (isEditing) {
      // For editing, replace the existing user
      updatedUsers = existingUsers.map(user => 
        user.id === parseInt(id) ? { ...userData } : user
      );
    } else {
      // For new user, generate a new ID
      const newId = existingUsers.length > 0 
        ? Math.max(...existingUsers.map(user => user.id)) + 1 
        : 1;
      
      updatedUsers = [
        ...existingUsers,
        {
          ...userData,
          id: newId,
          createdAt: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
          lastActive: new Date().toISOString().split('T')[0],
          permissions: ['Read'] // Default permission
        }
      ];
    }
    
    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Show success message
    setSnackbar({
      open: true,
      message: isEditing ? 'User updated successfully' : 'User created successfully',
      severity: 'success'
    });
    
    // Navigate back to user list
    setTimeout(() => {
      history.push('/');
    }, 1500);
  }
  };

  const handleBackToDashboard = () => {
    window.history.pushState({}, '', '/dashboard');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className={classes.root}>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleBackToDashboard}
        className={classes.backButton}
        startIcon={<ArrowBackIcon />}
      >
        Back to Dashboard
      </Button>

      <Typography variant="h4" className={classes.title}>
        {isEditing ? 'Edit User' : 'Add New User'}
      </Typography>

      <Paper className={classes.paper}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                value={userData.name}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={userData.email}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" className={classes.formControl} error={!!errors.role}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  name="role"
                  value={userData.role}
                  onChange={handleChange}
                  label="Role"
                  required
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="User">User</MenuItem>
                  <MenuItem value="Editor">Editor</MenuItem>
                </Select>
                {errors.role && <Typography color="error" variant="caption">{errors.role}</Typography>}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" className={classes.formControl} error={!!errors.status}>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  name="status"
                  value={userData.status}
                  onChange={handleChange}
                  label="Status"
                  required
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                </Select>
                {errors.status && <Typography color="error" variant="caption">{errors.status}</Typography>}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label="Department"
                name="department"
                value={userData.department}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>

          <div className={classes.buttons}>
            <Button
              component={Link}
              to="/"
              variant="outlined"
              color="primary"
              startIcon={<ArrowBackIcon />}
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
            >
              {isEditing ? 'Update User' : 'Save User'}
            </Button>
          </div>
        </form>
      </Paper>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
     
      </Snackbar>
    </div>
  );
};

export default UserForm;