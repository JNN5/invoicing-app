import { useState, useCallback } from "react";
import { v4 as uuid } from "uuid";

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
  );

  const createItem = (item, data) => {
    if (data && Array.isArray(data) && item) {
      setValue([...data, item]);
    } else if (!data && item) {
      setValue([item]);
    } else {
      throw new Error("missing or wrong parameters");
    }
  };

  const updateItem = (item, data) => {
    if (data && Array.isArray(data) && item) {
      setValue([...data.filter((element) => element.id !== item.id), item]);
    } else {
      throw new Error("missing or wrong parameters");
    }
  };

  const deleteItem = (item, data) => {
    if (data && Array.isArray(data) && item) {
      setValue(data.filter((element) => element.id !== item.id));
    } else {
      throw new Error("missing or wrong parameters");
    }
  };

  const createCourse = (course) => {
    if (course && typeof course === "object") {
      if (!course.id) course.id = uuid();
      setValue(...storedValue, course);
    } else {
      throw new Error("missing or wrong parameters");
    }
  };

  const updateCourse = useCallback(
    (id, course) => {
      if (id && course && typeof course === "object") {
        setValue(...storedValue.filter((c) => c.id !== id), course);
      } else {
        throw new Error("missing or wrong parameters");
      }
    },
    [setValue, storedValue]
  );

  const deleteCourse = (id) => {
    if (id) {
      setValue(...storedValue.filter((c) => c.id !== id));
    } else {
      throw new Error("missing or wrong parameters");
    }
  };

  const getCourse = useCallback(
    (id) => {
      if (id) {
        return storedValue.filter((c) => c.id === id);
      } else {
        throw new Error("missing or wrong parameters");
      }
    },
    [storedValue]
  );

  const listCourses = () => {
    return storedValue;
  };

  const createLesson = (courseId, lesson) => {
    if (courseId && lesson && typeof lesson === "object") {
      const course = getCourse(courseId);
      if (!lesson.id) lesson.id = uuid();
      lesson.courseId = courseId;
      updateCourse(courseId, {
        ...course,
        lessons: course.lessons.push(lesson) || lesson,
      });
    } else {
      throw new Error("missing or wrong parameters");
    }
  };

  const updateLesson = (courseId, lessonId, lesson) => {
    if (courseId && lessonId && lesson && typeof lesson === "object") {
      const course = getCourse(courseId);
      updateCourse(courseId, {
        ...course,
        lessons: course.lessons.filter((l) => l.id !== lessonId).push(lesson),
      });
    } else {
      throw new Error("missing or wrong parameters");
    }
  };

  const deleteLesson = (courseId, lessonId) => {
    if (courseId && lessonId) {
      const course = getCourse(courseId);
      updateCourse(courseId, {
        ...course,
        lessons: course.lessons.filter((l) => l.id !== lessonId),
      });
    } else {
      throw new Error("missing or wrong parameters");
    }
  };

  const getLesson = (courseId, lessonId) => {
    if (courseId && lessonId) {
      const course = getCourse(courseId);
      return course.lessons.filter((l) => l.id === lessonId)[0];
    } else {
      throw new Error("missing or wrong parameters");
    }
  };

  const listLessons = (courseId) => {
    if (courseId) {
      const course = getCourse(courseId);
      return course.lessons;
    } else {
      throw new Error("missing or wrong parameters");
    }
  };

  const setLessonEntry = (entry, lessonDate, courseId) => {
    if (entry && lessonDate && courseId) {
      const course = storedValue.filter((c) => c.id === courseId);
      const updatedLessons = course.lessons?.map((l) => {
        return { ...l, entry };
      });

      //const updatedCourse = { ...course, lessons: updatedLessons };
      console.log("sLE course", course, "sLE updatedLessons", updatedLessons);
      setValue(storedValue);
      /*setValue([
        ...storedValue.filter((c) => (c.id = courseId)),
        updatedCourse,
      ]);*/
    } else {
      throw new Error("missing or wrong parameters");
    }
  };

  const restoreData = (data) => {
    setValue(data);
  };

  return [
    storedValue,
    {
      createItem: useCallback(createItem, [setValue]),
      updateItem: useCallback(updateItem, [setValue]),
      deleteItem: useCallback(deleteItem, [setValue]),
      setLessonEntry: useCallback(setLessonEntry, [setValue, storedValue]),
      createCourse: useCallback(createCourse, [setValue, storedValue]),
      updateCourse: updateCourse,
      deleteCourse: useCallback(deleteCourse, [setValue, storedValue]),
      getCourse: getCourse,
      listCourses: useCallback(listCourses, [storedValue]),
      createLesson: useCallback(createLesson, [getCourse, updateCourse]),
      updateLesson: useCallback(updateLesson, [getCourse, updateCourse]),
      deleteLesson: useCallback(deleteLesson, [getCourse, updateCourse]),
      getLesson: useCallback(getLesson, [getCourse]),
      listLessons: useCallback(listLessons, [getCourse]),
      restoreData: useCallback(restoreData, [setValue]),
    },
  ];
}
