import { useContext, useState } from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";

import DynamicDialog from "../Generic/DynamicDialog";
import { Typography } from "@material-ui/core";

import { lesson } from "../../api/dataStructures";
import { DataContext } from "../../api/DataContext";

export default function CreateLesson(props) {
  const { createLesson } = useContext(DataContext);
  const [open, setOpen] = useState(false);

  // adding Students to data by creating a key value pair for each student: {Name: Anwesenheit}
  let fields = { ...lesson };
  Object.entries(props.item)
    .filter(([key]) => key.startsWith("Student"))
    .forEach(([, value]) => {
      fields[value] = { type: "String" };
    });

  // make sure new data are added to state
  function setData(lesson) {
    //addLesson(data, props.item, courses, functions.updateItem);
    /*
    let newItem = props.item;
    if (!newItem.lessons) props.item.lessons = [];
    newItem.lessons.push(data);

    const newData = [
      ...props.data.filter((item) => item.id !== props.item.id),
      newItem,
    ];
    //let newData = props.data.filter((item) => item.id !== props.item.id);
    //newData.push(data);
    console.log("newData in setData:", newData);
    props.setData(newData);*/
    createLesson(props.item.courseId, lesson);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} fullWidth variant="contained">
        <Typography variant="inherit" color="initial">
          <b>Create Lesson</b>
        </Typography>
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

// PropTypes validation
CreateLesson.propTypes = {
  item: PropTypes.object.isRequired,
};
