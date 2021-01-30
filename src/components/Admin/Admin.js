import useLocalStorage from "../../api/useLocalStorage";
import { FilePicker } from "react-file-picker";

import { Button } from "@material-ui/core";

export default function Admin() {
  const [courses, functions] = useLocalStorage("courses");

  const onChange = (file) => {
    //functions.restoreData(JSON.parse(file));
    console.log(JSON.parse(file));
  };

  return (
    <div>
      <Button variant="contained">
        <a
          href={
            "data:text/json;charset=utf-8," +
            encodeURIComponent(JSON.stringify(courses))
          }
          download="fileName.json"
        >
          Backup
        </a>
      </Button>
      <FilePicker
        extensions={["json"]}
        onChange={onChange}
        onError={(error) => console.log(error)}
      >
        <Button variant="contained">Upload backup to restore</Button>
      </FilePicker>
    </div>
  );
}
