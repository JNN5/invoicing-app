import { renderHook, act } from "@testing-library/react-hooks";
import useLocalStorage from "./useLocalStorage";

const sampleCourse = {
  Kursnummer: "270 1848",
  Kunde: "Ecclesia Holding GmbH",
  Niveau: "A2",
  Wochentag: "Dienstag",
  Zeit: "13:45",
  Start_Datum: "2021-01-05",
  Ende_Datum: "2021-04-27",
  Buch: "Insurance Matters",
  Km: "28",
  "Student 0": "Miles Westphal",
  "Student 1": "Jana Hartmann",
  "Student 2": "Luca Többens",
  "Student 3": "Marisa Hinder",
  "Student 4": "Marvin Krein",
  "Student 5": "Bettina Warkentin",
  "Student 6": "Diana Schernich",
  "Student 7": "Ines Ring",
  "Student 8": "Marie Götemann",
};

const sampleCourse2 = {
  Kursnummer: "270 813",
  Kunde: "ARI Armaturen",
  Niveau: "B1",
  Wochentag: "Montag",
  Start_Datum: "2021-01-04",
  Ende_Datum: "2021-12-31",
  Buch: "-",
  Km: "58",
  "Student 0": "Pia Böckmann",
  "Student 1": "Julia Brock",
  "Student 2": "Luis Brüseke",
  "Student 3": "Daniel Friesen",
  "Student 4": "Carolin Gerkins",
  "Student 5": "Laura Goschin",
  "Student 6": "Niklas Hahn",
  "Student 7": "Maik Heggen",
  "Student 8": "Eva Henkenjohann",
  "Student 9": "Kilian Justus",
  "Student 10": "Kevin Kramer",
  "Student 11": "Fabio Lehmann",
  "Student 12": "Reto Lüthi",
};

const sampleLesson = {
  datum: "2021-02-01",
  Unterrichtsinhalt: "Unit 5 page 57 business essentials trading",
  "Miles Westphal": "",
  "Jana Hartmann": "",
  "Luca Többens": "",
  "Marisa Hinder": "",
  "Marvin Krein": "",
  "Bettina Warkentin": "",
  "Diana Schernich": "",
  "Ines Ring": "",
  "Marie Götemann": "",
};

test("useLocalStorage Custom Hook test courses", () => {
  const { result } = renderHook(() => useLocalStorage("test1"));
  let [courses, functions] = result.current;
  expect(courses).toBeUndefined();

  // ---
  // Test successfully creating a course incl. id generated weekly lessons
  // ---
  act(() => {
    functions.createCourse(sampleCourse);
  });
  [courses, functions] = result.current;

  isObject1InObject2(sampleCourse, courses[0]);
  expect(courses[0].id).not.toBeNull();
  expect(courses[0].lessons[0].courseId).toBe(courses[0].id);

  act(() => {
    functions.createCourse(sampleCourse2);
  });
  [courses, functions] = result.current;
  isObject1InObject2(sampleCourse2, courses[1]);
  expect(courses[1].id).not.toBeNull();
  expect(courses[1].lessons[0].courseId).toBe(courses[1].id);
  // make sure id's are realy unique
  expect(courses[0].id === courses[1].id).toBeFalsy();

  // ---
  // update lesson
  // --

  act(() => {
    functions.updateCourse(courses[1].id, {
      ...sampleCourse2,
      Km: "59",
      Niveau: "A2/B1",
    });
  });
  [courses, functions] = result.current;
  isObject1InObject2(
    { ...sampleCourse2, Km: "59", Niveau: "A2/B1" },
    courses[1]
  ); //expect(courses).toContain({ ...sampleCourse, Km: "59", Niveau: "A2/B1" });
  expect(courses[1].id).not.toBeNull();
  expect(courses.length).toBe(2);

  // ---
  // get frist course
  // ---

  const course = functions.getCourse(courses[0].id);
  isObject1InObject2(courses[0], course);
  expect(typeof course === "object").toBe(true);

  // list courses
  // ---

  const courseList = functions.listCourses();
  expect(courseList.length).toBe(2);
  courseList.forEach((c, i) => isObject1InObject2(courses[i], c));

  // ---
  // delete second course
  // ---

  act(() => {
    functions.deleteCourse(courses[1].id);
  });
  [courses, functions] = result.current;
  expect(courses.length).toBe(1);
});

test("useLocalStorage Custom Hook test lessons", () => {
  const { result } = renderHook(() => useLocalStorage("test2"));
  let [courses, functions] = result.current;
  expect(courses).toBeUndefined();

  // ---
  // Test successfully creating a course incl. id generated weekly lessons
  // ---
  act(() => {
    functions.createCourse(sampleCourse);
  });
  [courses, functions] = result.current;

  isObject1InObject2(sampleCourse, courses[0]);
  expect(courses[0].id).not.toBeNull();
  expect(courses[0].lessons[0].courseId).toBe(courses[0].id);

  // ---
  // create lesson
  // ---

  act(() => {
    functions.createLesson(courses[0].id, sampleLesson);
  });
  [courses, functions] = result.current;
  const lesson = courses[0].lessons[courses[0].lessons.length - 1];
  isObject1InObject2(sampleLesson, lesson);
  expect(lesson.id).not.toBeNull();
  expect(lesson.courseId).toBe(courses[0].id);

  // ---
  // update lesson
  // --

  const updatedLessonSample = {
    ...sampleLesson,
    Unterrichtsinhalt: "Handstände und Purzelbäume",
    datum: "2021-02-02",
  };

  act(() => {
    functions.updateLesson(courses[0].id, lesson.id, updatedLessonSample);
  });
  [courses, functions] = result.current;
  const updatedLesson = courses[0].lessons.filter((l) => l.id === lesson.id)[0];
  isObject1InObject2(updatedLessonSample, updatedLesson);
  expect(updatedLesson.id).not.toBeNull();
  expect(updatedLesson.courseId).toBe(courses[0].id);

  // ---
  // get first lesson
  // ---

  const retrievedLesson = functions.getLesson(courses[0].id, updatedLesson.id);
  isObject1InObject2(updatedLessonSample, retrievedLesson);

  // ---
  // list lessons
  // ---

  const lessonList = functions.listLessons(courses[0].id);
  expect(Array.isArray(lessonList)).toBe(true);
  courses[0].lessons.forEach((l, i) => isObject1InObject2(l, lessonList[i]));

  // ---
  // delete lesson
  // ---

  act(() => {
    functions.deleteLesson(courses[0].id, updatedLesson.id);
  });
  [courses, functions] = result.current;
  expect(lessonList.length - courses[0].lessons.length).toBe(1);
});

test("useLocalStorage Custom Hook test backup & restore", () => {
  const { result } = renderHook(() => useLocalStorage("test3"));
  let [courses, functions] = result.current;
  expect(courses).toBeUndefined();
  // ---
  // Create some data first
  // ---
  act(() => {
    functions.createCourse(sampleCourse);
  });
  [courses, functions] = result.current;

  act(() => {
    functions.createCourse(sampleCourse2);
  });
  [courses, functions] = result.current;

  expect(Array.isArray(courses)).toBe(true);
  expect(courses.length).toBe(2);

  const stateBeforeBackup = courses.sort(sortByUuid);

  const backup = functions.backupData();
  act(() => {
    functions.restoreData(backup);
  });
  [courses, functions] = result.current;

  const restoredCourses = courses.sort(sortByUuid);

  // Check if all data from before is restored
  stateBeforeBackup.forEach((course, index) =>
    isObject1InObject2(course, restoredCourses[index])
  );

  // Check if the restored data contains additional data
  restoredCourses.forEach((course, index) =>
    isObject1InObject2(course, stateBeforeBackup[index])
  );
});

function isObject1InObject2(o1, o2) {
  Object.keys(o1).forEach((key) => {
    expect(o1[key]).toEqual(o2[key]);
  });
}

function sortByUuid(course1, course2) {
  // convert uuids to integers to compare them
  const conversionTable = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    a: 10,
    b: 11,
    c: 12,
    d: 13,
    e: 14,
    f: 15,
    g: 16,
    h: 17,
    i: 17,
    j: 18,
    k: 19,
    l: 20,
    m: 21,
    n: 22,
    o: 23,
    p: 24,
    q: 25,
    r: 26,
    s: 27,
    t: 28,
    u: 29,
    v: 30,
    w: 31,
    x: 32,
    y: 33,
    z: 34,
    "-": 35,
  };

  let uuid1 = 0;
  let uuid2 = 0;
  Array.from(course1.id).forEach((char) => uuid1 + conversionTable[char]);
  Array.from(course2.id).forEach((char) => uuid2 + conversionTable[char]);
  if (uuid1 < uuid2) {
    return -1;
  } else if (uuid2 > uuid1) {
    return 1;
  } else {
    return 0;
  }
}
