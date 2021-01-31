import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

import EditLesson from "./EditLesson";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  mainText: {
    color: "#000",
  },
  title: {
    textAlign: "center",
  },
}));

export default function ItemCard(props) {
  const classes = useStyles();

  console.log("lesson item props", props.item);

  function List() {
    if (props.item.lessons) {
      return props.item.lessons.map((lesson) => {
        const lessonWithCourseId = { ...lesson, courseId: props.item.id };
        return (
          <Grid item xs={5} key={lesson.datum}>
            <EditLesson item={lessonWithCourseId} />
          </Grid>
        );
      });
    } else {
      return <></>;
    }
  }

  return (
    <Grid key={props.item.id} item xs={12} sm={6}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              display="inline"
              color="textPrimary"
              className={classes.title}
            >
              {props.item.Kunde + " (" + props.item.Kursnummer + ")"}
            </Typography>
          </Grid>
          <List />
        </Grid>
      </Paper>
    </Grid>
  );
}

// PropTypes validation
ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
};
