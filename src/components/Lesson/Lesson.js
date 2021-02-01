import { useEffect, useState } from "react";
import useLocalStorage from "../../api/useLocalStorage";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import LessonItem from "./LessonItem";

export default function Lesson() {
  const [courses] = useLocalStorage("courses");
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState(() => {
    const now = new Date();
    return now.getFullYear() + "-" + now.getMonth() + 1;
  });

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
