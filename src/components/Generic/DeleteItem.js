import { useState } from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/DeleteForever";

import DynamicDialog from "./DynamicDialog";

export default function DeleteItem(props) {
  const [open, setOpen] = useState(false);

  // filter out deleted item from data array
  function setData() {
    let newData = props.data.filter((item) => item.id !== props.item.id);
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
          customerName: { type: "Disabled" },
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
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
};
