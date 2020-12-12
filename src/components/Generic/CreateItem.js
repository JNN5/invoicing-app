import { useState } from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import DynamicDialog from "./DynamicDialog";

export default function CreateItem(props) {
  const [open, setOpen] = useState(false);

  // make sure new data are added to state
  function setData(data) {
    // create a lesson for each week within the defined dates
    const lessons = createLessons(data.Start_Datum, data.Ende_Datum);
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

function createLessons(fromDate, toDate) {
  return [];
}
