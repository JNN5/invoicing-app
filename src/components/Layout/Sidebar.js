import { Link } from "react-router-dom";

import { MenuItem, MenuList } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    borderRight: "1px solid #DDD",
    backgroundColor: "#EEE",
  },
  text: {
    marginLeft: "1em",
    color: "black",
  },
  link: {
    textDecoration: "none",
    "& a": {
      textDecoration: "none",
    },
  },
  menuIcon: {
    marginRight: theme.spacing(2),
    color: "black",
    "&.active": {
      backgroundColor: "#EEE",
    },
  },
  menuButton: {
    margin: "5px",
    color: "black",
  },
}));

export default function Sidebar(props) {
  const classes = useStyles();
  return (
    <div className={props.classes.sidebar}>
      <MenuList>
        {props.routes.map((route) => {
          return (
            <Link key={route.name} to={route.path} className={classes.link}>
              <MenuItem className={classes.menuButton}>
                {route.icon.type.render()}
                <span className={classes.text}>{route.name}</span>
              </MenuItem>
            </Link>
          );
        })}
      </MenuList>
    </div>
  );
}
