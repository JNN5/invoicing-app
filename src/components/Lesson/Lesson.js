import useLocalStorage from "../../api/useLocalStorage";
import { courses as dataStructure } from "../../api/dataStructures";

import Overview from "../Generic/Overview";
import LessonItem from "./LessonItem";

export default function Lesson() {
  const [data, setData] = useLocalStorage("courses", []);

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
    <Overview
      dataStructure={dataStructure}
      data={data}
      setData={setData}
      header="Lessons"
      listItem={LessonItem}
    />
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
