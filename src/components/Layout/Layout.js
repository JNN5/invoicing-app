import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { routes } from "./routes";
import Header from "./Header";
import Sidebar from "./Sidebar";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "240px 1fr",
    gridTemplateRows: "50px auto",
    gridTemplateAreas: `
          "header header"
          "sidebar main"
          `,
    minHeight: "100vh",
  },
  header: {
    gridArea: "header",
    position: "static",
    textAlign: "center",
    backgroundColor: "#14b8b8",
  },
  sidebar: {
    gridArea: "sidebar",
    borderRight: "1px solid #DDD",
    backgroundColor: "#EEE",
  },
  main: {
    paddingTop: "3em",
    paddingLeft: "3em",
    paddingRight: "3em",
    backgroundColor: "#EEE",
  },
}));

export default function Layout() {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.gridContainer}>
        <Header classes={classes} />
        <Sidebar classes={classes} routes={routes} />
        <Switch>
          <Main classes={classes} routes={routes} />
        </Switch>
      </div>
    </Router>
  );
}

function Main(props) {
  return (
    <div className={props.classes.main}>
      {props.routes.map((route) => {
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
    </div>
  );
}
