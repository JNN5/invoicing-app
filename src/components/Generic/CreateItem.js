import { useState } from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import DynamicDialog from "./DynamicDialog";

import { lesson } from "../../api/dataStructures";

export default function CreateItem(props) {
  const [open, setOpen] = useState(false);

  // make sure new data are added to state
  function setData(data) {
    // create a lesson for each week within the defined dates
    const lessons = createLessons(data.Start_Datum, data.Ende_Datum, data);
    const newData = { ...data, lessons: lessons };
    props.setData([...props.data, newData]);
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
        startIcon={<AddIcon />}
      >
        Create
      </Button>
      <DynamicDialog
        open={open}
        action="Create"
        onClose={handleClose}
        fields={props.fields}
        setData={setData}
        initialState={{}}
        generateId={true}
      />
    </div>
  );
}

// PropTypes validation
CreateItem.propTypes = {
  fields: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
};

function createLessons(fromDate, toDate, course) {
  let date = new Date(fromDate);
  const endDate = new Date(toDate);

  let fields = {};
  Object.keys(lesson).forEach((key) => (fields[key] = "")); // import datastructure
  // add a field for every Student in the course
  Object.entries(course)
    .filter(([key]) => key.startsWith("Student"))
    .forEach(([, value]) => {
      fields[value] = "";
    });

  // Add a weekly lesson starting from the provided start date ending on the end date
  let lessons = [];
  while (date.getTime() <= endDate.getTime()) {
    lessons.push({ ...fields, datum: date.toISOString().substring(0, 10) });
    //add 7 days to date
    date.setDate(date.getDate() + 7);
  }
  return lessons;
}
