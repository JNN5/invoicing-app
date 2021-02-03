import { useContext, useState } from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/DeleteForever";

import DynamicDialog from "../Generic/DynamicDialog";
import { DataContext } from "../../api/DataContext";

export default function DeleteItem(props) {
  //const [, functions] = useLocalStorage("courses", []);
  const { deleteCourse } = useContext(DataContext);
  const [open, setOpen] = useState(false);

  // filter out deleted item from data array
  function setData() {
    deleteCourse(props.item.id);
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
        startIcon={<DeleteIcon />}
        fullWidth
      >
        Delete
      </Button>
      <DynamicDialog
        open={open}
        action="Delete"
        onClose={handleClose}
        fields={{
          id: { type: "Disabled" },
          Kunde: { type: "Disabled" },
        }}
        setData={setData}
        initialState={props.item}
      />
    </div>
  );
}

// PropTypes validation
DeleteItem.propTypes = {
  item: PropTypes.object.isRequired,
};
