import { useState } from "react";
import PropTypes from "prop-types";

import { Button, Typography } from "@material-ui/core/";
import EditIcon from "@material-ui/icons/Edit";

import DynamicDialog from "../Generic/DynamicDialog";

import { lesson as fieldStructure } from "../../api/dataStructures";
import useLocalStorage from "../../api/useLocalStorage";

export default function EditLesson(props) {
  const [courses, functions] = useLocalStorage("courses");
  const [open, setOpen] = useState(false);

  let fields = { ...fieldStructure };
  Object.entries(props.item)
    .filter(([key]) => key !== "id")
    .forEach(([key]) => {
      fields[key] = { type: "String" };
    });

  // make sure changed cases are editet in state
  function setData(updatedLesson) {
    const updatedCourse = {
      ...props.item,
      lessons: props.item.lessons.push(updatedLesson),
    };
    const updatedCourses = [
      ...courses.filter((course) => course.id !== props.item.id),
      updatedCourse,
    ];
    console.log("updatedCourses in EditLesson", updatedCourses);
    functions.updateItem(updatedCourses);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        startIcon={<EditIcon />}
        fullWidth
      >
        <Typography variant="inherit" display="inline" color="textPrimary">
          {formatDate(props.item.datum)}
        </Typography>
      </Button>
      <DynamicDialog
        open={open}
        action="Edit"
        onClose={handleClose}
        fields={fields}
        setData={setData}
        initialState={props.item}
      />
    </div>
  );
}

function formatDate(date) {
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mai",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dez",
  ];
  let newDate = new Date(date);
  return (
    newDate.getDate() +
    " " +
    month[newDate.getMonth()] +
    " " +
    newDate.getFullYear()
  );
}

// PropTypes validation
EditLesson.propTypes = {
  item: PropTypes.object.isRequired,
};
