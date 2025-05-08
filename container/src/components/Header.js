import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
    a: {
      textDecoration: "none",
    },
  },
  appBar: {
    variant:"contained" ,
    color:"primary" ,
    background:
      "linear-gradient(45deg,rgb(63,81,181) 85%,rgb(184, 184, 185) 40%)",
    borderBottom: "none",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
  },
  toolbar: {
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  logo: {
    fontWeight: 800,
    letterSpacing: 1.5,
    color: "#ffffff",
    textTransform: "uppercase",
    position: "relative",
    padding: "4px 0",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s ease",
    "&:before": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: "50%",
      width: "0%",
      height: "2px",
      background: "linear-gradient(90deg, transparent, #fff, transparent)",
      transform: "translateX(-50%)",
      transition: "width 0.4s ease",
    },
    "&:hover": {
      color: "#ffffff",
      textDecoration: "none",
      transform: "translateY(-2px)",
      "&:before": {
        width: "80%",
      },
    },
  },
  navLinks: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  link: {
    color:'white',
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

export default function Header({ isUserAuthenticated, onSignOut }) {
  const classes = useStyles();

  const onClick = () => {
    if (isUserAuthenticated && onSignOut) {
      onSignOut();
    }
  };

  return (
    <React.Fragment>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.logo} component={RouterLink} to="/">
            My App
          </Typography>
          <Button
            color="primary"
            variant="outlined"
            className={classes.link}
            component={RouterLink}
            to={isUserAuthenticated ? "/" : "/auth/signin"}
            onClick={onClick}
          >
            {isUserAuthenticated ? "Logout" : "Login / Signup"}
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
