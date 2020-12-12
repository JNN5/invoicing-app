import { useState } from "react";
import PropTypes from "prop-types";

import { v4 as uuid } from "uuid";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import AddIcon from "@material-ui/icons/Add";

import { default as useStorage } from "../../api/useLocalStorage";
import {
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

export default function DynamicDialog(props) {
  const [error, setError] = useState();
  const [row, setRow] = useState(props.initialState);
  const [fields, setFields] = useState(props.fields);

  function handleSave() {
    /*
    Error handling for required fields. Keep for later
    const unfilledRequiredfields = props.fields
      .filter((field) => field.required)
      .filter((field) => {
        if (!row[field.name] || row[field.name] === "") return true;
      });
    if (unfilledRequiredfields && unfilledRequiredfields.length > 0) {
      // console.log('unfilled required fields: ' + unfilledRequiredfields)
      setError("The field " + unfilledRequiredfields[0].name + " is required");
    } else {
      setError(null);
      props.setData(row);
      setRow({});
      props.onClose();
    }
    */
    let newEntry = row;
    if (props.generateId && !newEntry.id) newEntry.id = uuid();
    props.setData(newEntry);
    setRow({});
    props.onClose();
  }

  function handleCancel() {
    setError(null);
    props.onClose();
  }

  let Error;
  if (error) {
    console.log("error: " + error);
    Error = (
      <Typography color="textSecondary" key="add-dialog-error" gutterBottom>
        {error}
      </Typography>
    );
  }

  return (
    <Dialog
      onClose={handleCancel}
      aria-labelledby="create-dialog"
      open={props.open}
    >
      <DialogTitle id="create-dialog">{props.action} Dialog</DialogTitle>
      <DialogContent>
        {Object.entries(fields).map(([key, value]) => (
          <Field
            key={key + "-" + value}
            name={key}
            field={value}
            row={row}
            setRow={setRow}
            fields={fields}
            setFields={setFields}
          />
        ))}
      </DialogContent>
      {Error}
      <DialogActions>
        <ButtonGroup fullWidth variant="contained">
          <Button onClick={handleSave}>{props.action}</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
}

function Field(props) {
  const [data] = useStorage(props.field.db || "");

  function handleChange(event) {
    const newValue = event.target.value;
    props.setRow({ ...props.row, [event.target.id]: newValue });
  }

  function handleAddStudent(key, size) {
    const newKey = key + " " + size;
    const obj = { ...props.fields[key], size: size + 1 };

    props.setFields({
      ...props.fields,
      [key]: obj,
      [newKey]: { type: "String" },
    });
  }

  switch (props.field.type) {
    case "Disabled":
      return (
        <TextField
          disabled
          id={props.name}
          key={"create-" + props.name}
          label={props.name}
          value={props.row[props.name] || props.field.value || ""}
          margin="normal"
          fullWidth
        />
      );

    case "Time":
      return (
        <TextField
          id={props.name}
          key={"create-" + props.name}
          label={props.name}
          type="time"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
          value={props.row[props.name] || props.field.value || "09:00"}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
      );

    case "Date":
      return (
        <TextField
          id={props.name}
          key={"create-" + props.name}
          label={props.name}
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={props.row[props.name] || props.field.value || ""}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
      );

    case "Array":
      return (
        <>
          <Grid
            container
            spacing={2}
            direction="row"
            justify="flex-start"
            alignItems="baseline"
          >
            <Grid item xs={5} s={5}>
              <Typography
                variant="inherit"
                display="inline"
                color="textPrimary"
              >
                {"Add a " + props.name}
              </Typography>
            </Grid>
            <Grid item xs={5} s={5}>
              <Button
                onClick={() => handleAddStudent(props.name, props.field.size)}
              >
                <AddIcon />
              </Button>
            </Grid>
          </Grid>
        </>
      );

    case "Dropdown":
      return (
        <FormControl>
          <InputLabel id={props.name}>{props.name}</InputLabel>
          <Select
            labelId={props.name}
            id={props.name}
            key={"create-" + props.name}
            onChange={handleChange}
            margin="normal"
            fullWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {data.map((item) => {
              return (
                <MenuItem value={item.id}>
                  {item.customerName || item.id}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      );

    default:
      return (
        <TextField
          id={props.name}
          key={"create-" + props.name}
          label={props.name}
          value={props.row[props.name] || props.field.value || ""}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
      );
  }
}

// PropTypes validation
DynamicDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  action: PropTypes.string.isRequired,
  initialState: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  generateId: PropTypes.bool,
};
