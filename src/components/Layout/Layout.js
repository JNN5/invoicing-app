import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { routes } from "./routes";

import { Grid } from "@material-ui/core";
import Header from "./Header";
import Sidebar from "./Sidebar";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  main: {
    paddingTop: "3em",
    paddingLeft: "3em",
    backgroundColor: "#EEE",
  },
}));

export default function Layout() {
  const classes = useStyles();
  return (
    <Router>
      <Grid container spacing={0}>
        <Header />
        <Sidebar routes={routes} />
        <Grid item xs={9} className={classes.main}>
          <Switch>
            {routes.map((route) => {
              if (route.path === "/")
                return (
                  <Route
                    key={route.name}
                    exact
                    path={route.path}
                    component={route.component}
                  />
                );
              return (
                <Route
                  key={route.name}
                  path={route.path}
                  component={route.component}
                />
              );
            })}
          </Switch>
        </Grid>
      </Grid>
    </Router>
  );
}
