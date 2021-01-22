import { useState } from "react";
import useLocalStorage from "../../api/useLocalStorage";

import { Button, TextField } from "@material-ui/core/";

export default function DBTest() {
  const [data, functions] = useLocalStorage("test", []);

  console.log("data: ", data);

  const items = data?.map((item) => (
    <Item item={item} functions={functions} data={data} />
  ));

  return (
    <div>
      <CreateItem createItem={functions.createItem} data={data} />
      {items}
    </div>
  );
}

function CreateItem(props) {
  const [state, setState] = useState("");

  const handleClick = () => {
    props.createItem(
      { id: new Date().getMilliseconds(), value: state },
      props.data
    );
    setState("");
  };

  return (
    <div>
      <Button onClick={handleClick} variant="contained">
        Create Item
      </Button>
      <TextField
        type="string"
        value={state}
        onChange={(e) => setState(e.target.value)}
        fullWidth
      />
    </div>
  );
}

function Item(props) {
  const [state, setState] = useState(props.item.value);

  const handleEdit = () => {
    props.functions.updateItem({ ...props.item, value: state }, props.data);
  };
  const handleDelete = () => {
    props.functions.deleteItem(props.item, props.data);
  };

  return (
    <div key={props.item.id}>
      <TextField
        type="string"
        value={state}
        onChange={(e) => setState(e.target.value)}
      >
        {state}
      </TextField>
      <Button key="edit" onClick={handleEdit} variant="contained">
        Edit Item
      </Button>
      <Button key="delete" onClick={handleDelete} variant="contained">
        Delete Item
      </Button>
    </div>
  );
}
