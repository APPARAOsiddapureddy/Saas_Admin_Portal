import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MaterialLink from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  Box,
  useTheme,
  IconButton,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import ReceiptIcon from "@material-ui/icons/Receipt";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";

// const history = useHistory();

// const handleCardClick = () => {
//   history.push('/users');
// };


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <MaterialLink component={Link} to="/" color="inherit">
        SaaS Admin Platform
      </MaterialLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  "@global": {
    a: {
      textDecoration: "none",
    },
  },
  icon: {
    marginRight: theme.spacing(2),
    fontSize: 20,
  },
  heroContent: {
    background:
      theme.palette.type === "dark"
        ? "linear-gradient(45deg, #1a1a2e 0%, #16213e 100%)"
        : "linear-gradient(45deg, #f6f9fc 0%, #e9f1f7 100%)",
    padding: theme.spacing(8, 0, 6),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: theme.shadows[10],
    },
    background:
      theme.palette.type === "dark"
        ? "#1E293B"
        : theme.palette.background.paper,
    borderRadius: 16,
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
    position: "relative",
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardMediaIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: 60,
    color: theme.palette.common.white,
  },
  cardContent: {
    flexGrow: 1,
  },
  cardActions: {
    justifyContent: "space-between",
    padding: theme.spacing(2),
  },
  footer: {
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[200],
    padding: theme.spacing(6),
    marginTop: "auto",
  },

  button: {
    borderRadius: 0,
    fontWeight: 600,
    textTransform: "none",
    padding: theme.spacing(1, 3),
    fontSize: "1rem",
  },

  primaryButton: {
    background:
      "linear-gradient(45deg, rgb(63,81,181) 0%, rgb(76, 88, 161) 100%)",
    color: "#fff",
    "&:hover": {
      background: "linear-gradient(45deg, rgb(63,81,181) 0%, rgb(41, 55, 131) 100%)",
    },
  },

  outlinedButton: {

    fontSize: "0.9rem",
    backgroundColor: "transparent",
    color: "rgb(79, 49, 130)",
    border: "2px solid transparent",
    borderImage:
      "linear-gradient(45deg, rgb(79, 49, 130) 0%, rgb(95, 70, 139) 100%)",
    borderImageSlice: 1,
    "&:hover": {
      backgroundColor: "rgba(95, 70, 139, 0.05)",
    },
  },
}));


const modules = [
  {
    id: 1,
    title: "User Management",
    description:
      "Manage user accounts, roles, and permissions. Control access and monitor activity across your organization.",
    icon: <PeopleIcon />,
    route: "/auth",
    color: "#8B5CF6",
    // onclick: handleCardClick

  },
  {
    id: 2,
    title: "Billing Dashboard",
    description:
      "View invoices, payment history, and manage billing information. Track expenses with interactive charts.",
    icon: <ReceiptIcon />,
    route: "/",
    color: "#EC4899",
  },
  {
    id: 3,
    title: "Notifications",
    description:
      "Configure notification preferences and view your message history. Stay updated on important events.",
    icon: <NotificationsIcon />,
    route: "/auth",
    color: "#6366F1", // Indigo

  },
  {
    id: 4,
    title: "Dashboard",
    description:
      "Get a comprehensive overview of your system with customizable widgets and real-time metrics.",
    icon: <DashboardIcon />,
    route: "/",
    color: "#14B8A6",
  },
];

export default function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <React.Fragment>
      <main
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="md">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
              style={{ fontWeight: 800 }}
            >
              SaaS Admin Platform
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              A comprehensive admin solution with micro-frontend architecture,
              built for enterprise-grade applications with focus on performance,
              accessibility, and user experience.
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              paragraph
            >
              Sign Up To Explore...
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button
                    className={`${classes.button} ${classes.primaryButton}`}
                  >
                    Getting Started
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    className={`${classes.button} ${classes.outlinedButton}`}
                  >
                    Documentation
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>

        <Container className={classes.cardGrid} maxWidth="lg">
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            paragraph
          >
            Features
          </Typography>
          <Grid container spacing={4}>
            {modules.map((module) => (
              <Grid item key={module.id} xs={12} sm={6} md={3}>
                <Card className={classes.card} elevation={3}>
                  <CardMedia
                    className={classes.cardMedia}
                    style={{ backgroundColor: module.color }}
                  >
                    <Box className={classes.cardMediaIcon}>{module.icon}</Box>
                  </CardMedia>
                  <CardContent className={classes.cardContent}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      style={{ fontWeight: 600 }}
                    >
                      {module.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {module.description}
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.cardActions}>
                    <Button
                      size="small"
                      color="primary"
                      component={Link}
                      to={module.route}
                      variant="text"
                    >

                    </Button>
                    <Button size="small" color="secondary" variant="text">

                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Built with Micro-Frontend Architecture • React • TypeScript • Material
          UI
        </Typography>
        <Box mt={2}>
          <Copyright />
        </Box>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
