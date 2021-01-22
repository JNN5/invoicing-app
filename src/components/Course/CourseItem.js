import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import EditItem from "../Generic/EditItem";
import DeleteItem from "../Generic/DeleteItem";
import CreateLesson from "../Lesson/CreateLesson";

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

  const courseItemContent = Object.entries(props.item)
    .filter(([key]) => {
      if (key === "id" || key.startsWith("Student") || key === "lessons")
        return false;
      return true;
    })
    .map(([key, value]) => {
      return (
        <Grid container spacing={1}>
          <Grid item xs={4} key={key}>
            {key}
          </Grid>
          <Grid item xs={5} key={value} className={classes.mainText}>
            {value}
          </Grid>
        </Grid>
      );
    });

  return (
    <Grid key={props.item.id} item xs={12} sm={6}>
      <Paper className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item xs={9}>
            {courseItemContent}
          </Grid>
          <Grid item xs={3}>
            <EditItem item={props.item} />
            <DeleteItem item={props.item} />
          </Grid>
          <Grid item xs={12}>
            <CreateLesson />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

// PropTypes validation
ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
};
