import { useContext, useEffect, useState } from "react";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import LessonItem from "./LessonItem";
import { DataContext } from "../../api/DataContext";

export default function Lesson() {
  const { courses } = useContext(DataContext);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState(() => {
    const now = new Date();
    function getMonth() {
      let month = "";
      if (now.getMonth() < 10) month = "0";
      return (month += now.getMonth());
    }
    const month = getMonth();
    return now.getFullYear() + "-" + month;
  });
  console.log("Lesson Render");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    setFilteredData(
      courses?.map((course) => {
        const filteredLessons = course.lessons.filter((item) =>
          item.datum.includes(filter)
        );
        return { ...course, lessons: filteredLessons };
      })
    );
  }, [courses, filter]);

  const lessonList = filteredData?.map((lesson) => {
    //const lessonItem = {...lesson, courseId = course.id}
    return (
      <LessonItem key={lesson.id || JSON.stringify(lesson)} item={lesson} />
    );
  });

  return (
    <div>
      <h4>Lessons</h4>
      <TextField
        id="filter"
        key="filter"
        label="Monat (YYYY-MM)"
        value={filter}
        onChange={handleFilterChange}
        margin="normal"
      />
      <Grid container spacing={3}>
        {lessonList}
      </Grid>
    </div>
  );
}
