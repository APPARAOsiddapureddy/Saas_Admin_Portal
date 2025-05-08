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
      <Link color="inherit" to="/">
        SaaS Admin Platform
      </Link>{' '}
      {new Date().getFullYear()}
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
    background: 'linear-gradient(45deg, rgb(63,81,181) 0%, rgb(74, 86, 150) 100%)',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(4, 0, 3),
    padding: theme.spacing(1.5),
    borderRadius: theme.spacing(3),
    background: 'linear-gradient(45deg, rgb(63,81,181) 0%, rgb(75, 87, 160) 100%)',
    boxShadow: '0 4px 12px rgba(79, 49, 130, 0.25)',
    '&:hover': {
      background: 'linear-gradient(45deg, rgb(63,81,181) 0%, rgb(75, 87, 160) 100%)',
      boxShadow: '0 6px 14px rgb(62, 75, 144)',
    },
  },
  checkboxColor: {
    color: 'rgb(63,81,181)',
    '&.Mui-checked': {
      color: 'rgb(63,81,181)',
    },
  },
  textField: {
    marginBottom: theme.spacing(2),
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
      color: 'rgb(63,81,181)',
    },
  },
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: 600,
    color: 'rgb(63,81,181)',
  },
  rememberMeContainer: {
    marginBottom: theme.spacing(1),
  },
}));

export default function SignIn({ onSignIn }) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.title}>
          Welcome Back
        </Typography>
        <form
          onSubmit={(e) => e.preventDefault()}
          className={classes.form}
          noValidate
        >
          <TextField
            className={classes.textField}
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            className={classes.textField}
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Grid container className={classes.rememberMeContainer}>
            <Grid item xs>
              <FormControlLabel
                control={<Checkbox value="remember" color="default" className={classes.checkboxColor} />}
                label="Remember me"
              />
            </Grid>
            <Grid item>
              <Link to="/forgot-password" className={classes.link}>
                Forgot password?
              </Link>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={onSignIn}
          >
            Sign In
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link to="/auth/signup" className={classes.link}>{"Don't have an account? Sign Up"}</Link>
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
