import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import {
  Paper,
  Typography,
  Button,
  Grid,
  Divider,
  Chip,
  Card,
  CardContent,
  IconButton
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(3),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  backButton: {
    marginBottom: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  card: {
    marginTop: theme.spacing(2),
  },
  chip: {
    margin: theme.spacing(0.5),
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
  infoGrid: {
    marginTop: theme.spacing(2),
  },
  infoLabel: {
    fontWeight: 'bold',
  },
  actions: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  actionButton: {
    marginLeft: theme.spacing(1),
  },
}));

const UserDetails = () => {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // Sample user data
  const sampleUsers = [
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com', 
      role: 'Admin', 
      status: 'Active',
      department: 'IT',
      phone: '555-1234',
      createdAt: '2023-01-15',
      lastActive: '2023-05-06',
      permissions: ['Read', 'Write', 'Delete', 'Admin']
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      role: 'User', 
      status: 'Active',
      department: 'Marketing',
      phone: '555-5678',
      createdAt: '2023-02-20',
      lastActive: '2023-05-05',
      permissions: ['Read', 'Write']
    },
    { 
      id: 3, 
      name: 'Bob Johnson', 
      email: 'bob@example.com', 
      role: 'Editor', 
      status: 'Inactive',
      department: 'Sales',
      phone: '555-9012',
      createdAt: '2023-03-10',
      lastActive: '2023-04-15',
      permissions: ['Read', 'Write', 'Edit']
    },
    { 
      id: 4, 
      name: 'Sarah Williams', 
      email: 'sarah@example.com', 
      role: 'User', 
      status: 'Pending',
      department: 'HR',
      phone: '555-3456',
      createdAt: '2023-04-05',
      lastActive: '2023-04-05',
      permissions: ['Read']
    },
    { 
      id: 5, 
      name: 'Michael Brown', 
      email: 'michael@example.com', 
      role: 'User', 
      status: 'Active',
      department: 'Finance',
      phone: '555-7890',
      createdAt: '2023-05-01',
      lastActive: '2023-05-04',
      permissions: ['Read', 'Write']
    },
  ];

  useEffect(() => {
    // Find user with matching ID
    const foundUser = sampleUsers.find(u => u.id === parseInt(id));
    
    if (foundUser) {
      setUser(foundUser);
    } else {
      // Redirect to user list if user not found
      history.push('/');
    }
  }, [id, history]);

  const handleDeleteUser = () => {
    console.log('Deleting user:', user.id);
    setDeleteDialogOpen(false);
    // In a real app, you would call an API to delete the user
    // For now, redirect to the user list
    history.push('/');
  };

  const handleBackToDashboard = () => {
    window.history.pushState({}, '', '/dashboard');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const getStatusChip = (status) => {
    switch(status) {
      case 'Active':
        return <Chip label="Active" className={classes.statusActive} />;
      case 'Inactive':
        return <Chip label="Inactive" className={classes.statusInactive} />;
      case 'Pending':
        return <Chip label="Pending" className={classes.statusPending} />;
      default:
        return <Chip label={status} />;
    }
  };

  if (!user) {
    return <div className={classes.root}>Loading...</div>;
  }

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

      <div className={classes.header}>
        <div>
          <Typography variant="h4">{user.name}</Typography>
          <Typography variant="subtitle1" color="textSecondary">{user.email}</Typography>
        </div>
        <div>
          {getStatusChip(user.status)}
        </div>
      </div>

      <Paper className={classes.paper}>
        <Typography variant="h6">User Information</Typography>
        <Divider className={classes.divider} />
        
        <Grid container spacing={2} className={classes.infoGrid}>
          <Grid item xs={12} sm={6}>
            <Typography className={classes.infoLabel}>Role:</Typography>
            <Typography>{user.role}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography className={classes.infoLabel}>Department:</Typography>
            <Typography>{user.department || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography className={classes.infoLabel}>Phone:</Typography>
            <Typography>{user.phone || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography className={classes.infoLabel}>Created At:</Typography>
            <Typography>{user.createdAt}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography className={classes.infoLabel}>Last Active:</Typography>
            <Typography>{user.lastActive}</Typography>
          </Grid>
        </Grid>

        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h6">Permissions</Typography>
            <div style={{ marginTop: 10 }}>
              {user.permissions.map((permission, index) => (
                <Chip 
                  key={index} 
                  label={permission} 
                  className={classes.chip} 
                  color="primary"
                  variant="outlined"
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <div className={classes.actions}>
          <IconButton 
            color="primary" 
            className={classes.actionButton}
            onClick={() => console.log('Edit user:', user.id)} // Replace with actual edit logic or navigation
          >
            <EditIcon />
          </IconButton>
          <IconButton 
            color="secondary" 
            className={classes.actionButton}
            onClick={() => setDeleteDialogOpen(true)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteUser} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserDetails;
