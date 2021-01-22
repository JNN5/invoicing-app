import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import EditItem from "./EditItem";
import DeleteItem from "./DeleteItem";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  mainText: {
    color: "#000",
  },
}));

export default function ItemCard(props) {
  const classes = useStyles();

  return (
    <Grid key={props.item.id} item xs={12} sm={6}>
      <Paper className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item xs={9}>
            {Object.entries(props.item).map(([key, value]) => {
              if (key !== "id") {
                return (
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      {key}
                    </Grid>
                    <Grid item xs={5} className={classes.mainText}>
                      {value}
                    </Grid>
                  </Grid>
                );
              } else {
                return <></>;
              }
            })}
          </Grid>
          <Grid item xs={3}>
            <EditItem
              fields={props.dataStructure}
              data={props.data}
              item={props.item}
              functions={props.functions}
            />
            <DeleteItem
              data={props.data}
              item={props.item}
              functions={props.functions}
            />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

// PropTypes validation
ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
  dataStructure: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  functions: PropTypes.object.isRequired,
};
