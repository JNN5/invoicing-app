import { useState } from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";

import DynamicDialog from "../Generic/DynamicDialog";
import useLocalStorage from "../../api/useLocalStorage";
import { courses as fields } from "../../api/dataStructures";

export default function EditItem(props) {
  const [, functions] = useLocalStorage("courses", []);
  const [open, setOpen] = useState(false);

  function setData(course) {
    functions.updateCourse(props.item.id, course);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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
        Edit
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

// PropTypes validation
EditItem.propTypes = {
  item: PropTypes.object.isRequired,
};
