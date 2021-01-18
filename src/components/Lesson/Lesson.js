import { useEffect, useState } from "react";
import useLocalStorage from "../../api/useLocalStorage";
import { courses as dataStructure } from "../../api/dataStructures";

import TextField from "@material-ui/core/TextField";

import Overview from "../Generic/Overview";
import LessonItem from "./LessonItem";

export default function Lesson() {
  const [data, setData] = useLocalStorage("courses", []);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState(() => {
    const now = new Date();
    return now.getFullYear() + "-" + now.getMonth() + 1;
  });

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  console.log(filteredData);

  useEffect(() => {
    console.log(filter);
    console.log(data);
    setFilteredData(
      data.map((course) => {
        const filteredLessons = course.lessons.filter((item) =>
          item.datum.includes(filter)
        );
        return { ...course, lessons: filteredLessons };
      })
    );
  }, [data, filter]);

  /*const wochentag = [
    "Sontag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ];*/
  /*.map((course) => {
      return course.lessons.map((lesson) => {
        return lesson;
      });
    })*/

  return (
    <div>
      <TextField
        id="filter"
        key="filter"
        label="Monat"
        value={filter}
        onChange={handleFilterChange}
        margin="normal"
      />
      <Overview
        dataStructure={dataStructure}
        data={filteredData}
        setData={setData}
        header="Lessons"
        listItem={LessonItem}
      />
    </div>
  );

  /*return (
    <TableContainer component={Paper}>
      <Table aria-label="Tabelle">
        <TableHead>
          <TableRow>
            <TableCell align="left">Kursnummer</TableCell>
            <TableCell align="left">Kunde</TableCell>
            <TableCell align="left">Datum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lessons.map((lesson) => (
            <TableRow key={lesson.id}>
              <TableCell align="left">{lesson.Kursnummer}</TableCell>
              <TableCell align="left">{lesson.Kunde}</TableCell>
              <TableCell align="left" component="th" scope="row">
                {wochentag[new Date(lesson.datum).getDay()] +
                  " " +
                  lesson.datum}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );*/
}
