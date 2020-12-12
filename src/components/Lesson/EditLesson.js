import { useState } from "react";
import PropTypes from "prop-types";

import { Button, Typography } from "@material-ui/core/";
import EditIcon from "@material-ui/icons/Edit";

import DynamicDialog from "../Generic/DynamicDialog";

export default function EditLesson(props) {
  const [open, setOpen] = useState(false);

  let fields = { ...props.fields };
  Object.entries(props.item)
    .filter(([key]) => key.startsWith("Student"))
    .forEach(([, value]) => {
      fields[value] = { type: "String" };
    });

  // make sure changed cases are editet in state
  function setData(data) {
    const newItem = { ...props.item, lessons: props.item.lessons.push(data) };
    const newData = [
      ...props.data.filter((item) => item.id !== props.item.id),
      newItem,
    ];
    console.log("newData in setData:", newData);
    props.setData(newData);
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
  fields: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
};
