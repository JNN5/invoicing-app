import { useState } from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";

import DynamicDialog from "./DynamicDialog";

export default function Students(props) {
  const [open, setOpen] = useState(false);

  // make sure changed cases are editet in state
  function setData(data) {
    let newData = props.data;
    newData.push(data);
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
      <Button onClick={handleClickOpen}>
        <EditIcon />
      </Button>
      <DynamicDialog
        open={open}
        action="Edit"
        onClose={handleClose}
        fields={props.fields}
        setData={setData}
        initialState={props.item}
      />
    </div>
  );
}

// PropTypes validation
Students.propTypes = {
  fields: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
};
