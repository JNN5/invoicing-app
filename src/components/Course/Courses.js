import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import CourseItem from "./CourseItem";
import CreateCourse from "./CreateCourse";
import { useContext } from "react";
import { DataContext } from "../../api/DataContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Courses() {
  const classes = useStyles();
  const { courses } = useContext(DataContext);

  const sortedData = courses?.sort((a, b) => {
    if (a.Kunde.toUpperCase() < b.Kunde.toUpperCase()) return -1;
    if (a.Kunde.toUpperCase() > b.Kunde.toUpperCase()) return 1;
    return 0;
  });

  //console.log("Courses render");

  const courseList = sortedData?.map((item) => {
    return <CourseItem key={item.id || JSON.stringify(item)} item={item} />;
  });

  return (
    <div className="Overview">
      <div className={classes.root}>
        <h4>Courses</h4>
        <CreateCourse />
        <Grid container spacing={3}>
          {courseList}
        </Grid>
      </div>
    </div>
  );
}
