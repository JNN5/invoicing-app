import useLocalStorage from "../../api/useLocalStorage";
import { FilePicker } from "react-file-picker";

import { Button } from "@material-ui/core";

export default function Admin() {
  const [, functions] = useLocalStorage("courses");

  const onChange = (file) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      functions.restoreData(e.target.result);
    };
  };

  return (
    <div>
      <Button variant="contained">
        <a
          href={
            "data:text/json;charset=utf-8," +
            encodeURIComponent(functions.backupData())
          }
          download="backup.json"
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
