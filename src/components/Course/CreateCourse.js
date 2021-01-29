import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import DynamicDialog from "../Generic/DynamicDialog";

import { lesson, courses as fields } from "../../api/dataStructures";
import useLocalStorage from "../../api/useLocalStorage";

const useStyles = makeStyles((theme) => ({
  button: {
    marginBottom: "1em",
  },
}));

export default function CreateCourse() {
  const classes = useStyles();

  const [courses, functions] = useLocalStorage("courses", []);
  const [open, setOpen] = useState(false);

  // make sure new data are added to state
  function setData(course) {
    // create a lesson for each week within the defined dates
    const lessons = createLessons(
      course.Start_Datum,
      course.Ende_Datum,
      course
    );
    const newCourse = { ...course, lessons: lessons };
    functions.createItem(newCourse, courses);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div className={classes.button}>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        startIcon={<AddIcon />}
      >
        Create
      </Button>
      <DynamicDialog
        open={open}
        action="Create"
        onClose={handleClose}
        fields={fields}
        setData={setData}
        initialState={{}}
        generateId={true}
      />
    </div>
  );
}

function createLessons(fromDate, toDate, course) {
  let date = new Date(fromDate);
  const endDate = new Date(toDate);

  let lessonFields = {};
  Object.keys(lesson).forEach((key) => (lessonFields[key] = "")); // import datastructure
  // add a field for every Student in the course
  Object.entries(course)
    .filter(([key]) => key.startsWith("Student"))
    .forEach(([, value]) => {
      lessonFields[value] = "";
    });

  // Add a weekly lesson starting from the provided start date ending on the end date
  let lessons = [];
  while (date.getTime() <= endDate.getTime()) {
    lessons.push({
      ...lessonFields,
      datum: date.toISOString().substring(0, 10),
    });
    //add 7 days to date
    date.setDate(date.getDate() + 7);
  }
  return lessons;
}
