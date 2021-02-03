import { useContext, useState } from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";

import DynamicDialog from "../Generic/DynamicDialog";
import { courses as fields } from "../../api/dataStructures";
import { DataContext } from "../../api/DataContext";

export default function EditItem(props) {
  const { updateCourse } = useContext(DataContext);
  const [open, setOpen] = useState(false);

  function setData(course) {
    updateCourse(props.item.id, course);
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
