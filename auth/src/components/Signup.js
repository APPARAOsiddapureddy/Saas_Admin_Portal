import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link to="/">Your Website</Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    a: {
      textDecoration: 'none',
    },
  },
  paper: {
    marginTop: theme.spacing(6),
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(250, 250, 255, 0.9)',
    borderRadius: theme.spacing(2),
    boxShadow: '0 8px 20px rgba(79, 49, 130, 0.15)',
  },
  avatar: {
    margin: theme.spacing(2, 0, 1, 0),
    width: theme.spacing(6),
    height: theme.spacing(6),
    background: 'linear-gradient(45deg, rgb(63,81,181) 0%, rgb(62, 82, 191) 100%)',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(4, 0, 3),
    padding: theme.spacing(1.5),
    borderRadius: theme.spacing(3),
    background: 'linear-gradient(45deg, rgb(63,81,181) 0%, rgb(69, 90, 209) 100%)',
    boxShadow: '0 4px 12px rgb(63,81,181)',
    '&:hover': {
      background: 'linear-gradient(45deg, rgb(63,81,181) 0%, rgb(69, 90, 209) 100%))',
      boxShadow: '0 6px 14px rgb(63,81,181)',
    },
  },
  checkboxColor: {
    color: 'rgb(63,81,181)',
    '&.Mui-checked': {
      color: 'rgb(95, 70, 139)',
    },
  },
  textField: {
    '& label.Mui-focused': {
      color: 'rgb(63,81,181)',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: theme.spacing(1),
      '&.Mui-focused fieldset': {
        borderColor: 'rgb(63,81,181)',
        borderWidth: 2,
      },
    },
  },
  link: {
    color: 'rgb(63,81,181)',
    fontWeight: 500,
    '&:hover': {
      color: 'rgb(95, 70, 139)',
    },
  },
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: 600,
    color: 'rgb(63,81,181)',
  },
  formSection: {
    marginBottom: theme.spacing(2),
  },
  checkboxLabel: {
    fontSize: '0.87rem',
  },
}));

export default function SignUp({ onSignIn }) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.title}>
          Create Your Account
        </Typography>
        <form
          onSubmit={(e) => e.preventDefault()}
          className={classes.form}
          noValidate
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.textField}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.textField}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12} className={classes.formSection}>
              <TextField
                className={classes.textField}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12} className={classes.formSection}>
              <TextField
                className={classes.textField}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                helperText="Password must be at least 8 characters"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="default" className={classes.checkboxColor} />}
                label={
                  <Typography variant="body2" className={classes.checkboxLabel}>
                    I want to receive inspiration, marketing promotions and updates via email.
                  </Typography>
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={onSignIn}
          >
            Create Account
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link to="/auth/signin" className={classes.link}>Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
