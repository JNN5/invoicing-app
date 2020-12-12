import Overview from "../Generic/Overview";
import { courses as dataStructure } from "../../api/dataStructures";
import { default as useStorage } from "../../api/useLocalStorage";
import CourseItem from "./CourseItem";

export default function Courses() {
  const [data, setData] = useStorage("courses", []);

  const sortedData = data.sort((a, b) => {
    if (a.Kunde.toUpperCase() < b.Kunde.toUpperCase()) return -1;
    if (a.Kunde.toUpperCase() > b.Kunde.toUpperCase()) return 1;
    return 0;
  });

  return (
    <Overview
      dataStructure={dataStructure}
      data={sortedData}
      setData={setData}
      header="Courses"
      listItem={CourseItem}
    />
  );
}
