import { useState, useCallback } from "react";
import uuid from "react-uuid";

import { lesson as lessonObjectStructure } from "./dataStructures";

export default function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  console.log("useLocalStorageRender", storedValue);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  /*const setValue = useCallback(
    (value) => {
      try {
        console.log(key, value);
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    },
    [key, storedValue]
  );*/

  const setValue = useCallback(
    (value) => {
      try {
        //console.log(key, value);
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    },
    [key, storedValue]
  );

  const createCourse = useCallback(
    (course) => {
      if (course && typeof course === "object") {
        if (!course.id) course.id = uuid();
        // generate a lesson per week if the course has a start and end date
        let lessons = [];
        if (course.Start_Datum && course.Ende_Datum) {
          lessons = generateWeeklyLesson(
            course.Start_Datum,
            course.Ende_Datum,
            course
          );
        }
        course.lessons = lessons;
        if (storedValue) {
          setValue([...storedValue, course]);
        } else {
          setValue([course]);
        }
      } else {
        throw new Error("missing or wrong parameters");
      }
    },
    [setValue, storedValue]
  );

  const updateCourse = useCallback(
    (id, course) => {
      if (id && course && typeof course === "object") {
        setValue([...storedValue.filter((c) => c.id !== id), course]);
      } else {
        throw new Error("missing or wrong parameters");
      }
    },
    [setValue, storedValue]
  );

  const deleteCourse = useCallback(
    (id) => {
      if (id) {
        setValue([...storedValue.filter((c) => c.id !== id)]);
      } else {
        throw new Error("missing or wrong parameters");
      }
    },
    [setValue, storedValue]
  );

  const getCourse = useCallback(
    (id) => {
      if (id) {
        return storedValue.filter((c) => c.id === id)[0];
      } else {
        throw new Error("missing or wrong parameters");
      }
    },
    [storedValue]
  );

  const listCourses = useCallback(() => {
    return storedValue;
  }, [storedValue]);

  const generateWeeklyLesson = (fromDate, toDate, course) => {
    if (fromDate && toDate && course && typeof course === "object") {
      let date = new Date(fromDate);
      const endDate = new Date(toDate);

      let lessonFields = {};
      Object.keys(lessonObjectStructure).forEach(
        (key) => (lessonFields[key] = "")
      ); // import datastructure
      // add a field for every Student in the course
      Object.entries(course)
        .filter(([key]) => key.startsWith("Student"))
        .forEach(([, value]) => {
          lessonFields[value] = "";
        });

      // Add a weekly lesson starting from the provided start date ending on the end date
      let lessons = [];
      while (date.getTime() <= endDate.getTime()) {
        lessons.push({
          ...lessonFields,
          datum: date.toISOString().substring(0, 10),
          courseId: course.id,
          id: uuid(),
        });
        //add 7 days to date
        date.setDate(date.getDate() + 7);
      }
      return lessons;
    } else {
      throw new Error("missing or wrong parameters");
    }
  };

  const createLesson = useCallback(
    (courseId, lesson) => {
      if (courseId && lesson && typeof lesson === "object") {
        const course = getCourse(courseId);
        if (!lesson.id) lesson.id = uuid();
        lesson.courseId = courseId;
        let lessons = [];
        if (course.lessons) lessons = course.lessons;
        lessons.push(lesson);
        updateCourse(courseId, {
          ...course,
          lessons: lessons,
        });
      } else {
        throw new Error("missing or wrong parameters");
      }
    },
    [getCourse, updateCourse]
  );

  const updateLesson = useCallback(
    (courseId, lessonId, lesson) => {
      if (courseId && lessonId && lesson && typeof lesson === "object") {
        const course = getCourse(courseId);
        updateCourse(courseId, {
          ...course,
          lessons: [...course.lessons.filter((l) => l.id !== lessonId), lesson],
        });
      } else {
        throw new Error("missing or wrong parameters");
      }
    },
    [getCourse, updateCourse]
  );

  const deleteLesson = useCallback(
    (courseId, lessonId) => {
      if (courseId && lessonId) {
        const course = getCourse(courseId);
        updateCourse(courseId, {
          ...course,
          lessons: course.lessons.filter((l) => l.id !== lessonId),
        });
      } else {
        throw new Error("missing or wrong parameters");
      }
    },
    [getCourse, updateCourse]
  );

  const getLesson = useCallback(
    (courseId, lessonId) => {
      if (courseId && lessonId) {
        const course = getCourse(courseId);
        return course.lessons.filter((l) => l.id === lessonId)[0];
      } else {
        throw new Error("missing or wrong parameters");
      }
    },
    [getCourse]
  );

  const listLessons = useCallback(
    (courseId) => {
      if (courseId) {
        const course = getCourse(courseId);
        return course.lessons;
      } else {
        throw new Error("missing or wrong parameters");
      }
    },
    [getCourse]
  );

  const backupData = useCallback(() => {
    return JSON.stringify(storedValue);
  }, [storedValue]);

  const restoreData = useCallback(
    (data) => {
      setValue(JSON.parse(data));
    },
    [setValue]
  );

  return [
    storedValue,
    {
      createCourse,
      updateCourse,
      deleteCourse,
      getCourse,
      listCourses,
      createLesson,
      updateLesson,
      deleteLesson,
      getLesson,
      listLessons,
      backupData,
      restoreData,
    },
  ];
}
