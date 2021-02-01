import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import DynamicDialog from "../Generic/DynamicDialog";

import { courses as fields } from "../../api/dataStructures";
import useLocalStorage from "../../api/useLocalStorage";

const useStyles = makeStyles((theme) => ({
  button: {
    marginBottom: "1em",
  },
}));

export default function CreateCourse() {
  const classes = useStyles();

  const [, functions] = useLocalStorage("courses", []);
  const [open, setOpen] = useState(false);

  // make sure new data are added to state
  function setData(course) {
    // create a lesson for each week within the defined dates
    /*const lessons = createLessons(
      course.Start_Datum,
      course.Ende_Datum,
      course
    );
    const newCourse = { ...course, lessons: lessons };
    functions.createItem(newCourse, courses);*/
    functions.createCourse(course);
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
