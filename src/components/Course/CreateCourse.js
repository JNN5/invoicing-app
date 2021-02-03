import { useContext, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import DynamicDialog from "../Generic/DynamicDialog";

import { courses as fields } from "../../api/dataStructures";
import { DataContext } from "../../api/DataContext";

const useStyles = makeStyles((theme) => ({
  button: {
    marginBottom: "1em",
  },
}));

export default function CreateCourse() {
  const classes = useStyles();

  const { createCourse } = useContext(DataContext);
  const [open, setOpen] = useState(false);

  function setData(course) {
    createCourse(course);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div className={classes.button}>
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
        fields={fields}
        setData={setData}
        initialState={{}}
        generateId={true}
      />
    </div>
  );
}
