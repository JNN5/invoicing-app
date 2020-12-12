/*export const course = [
  { name: "courseId", type: "String" },
  { name: "customerName", type: "String" },
  { name: "teacher", type: "String", value: "Tiffany Neumann" },
  { name: "title", type: "String", value: "Englisch-Training" },
  { name: "level", type: "String" },
  { name: "weekday", type: "String" },
  { name: "timeFrom", type: "Time" },
  { name: "timeTo", type: "Time" },
  { name: "book", type: "String" },
  { name: "distance", type: "Float" },
  { name: "costPerKilometer", type: "Float", value: "0.3" },
  { name: "lessonDurationMinutes", type: "Integer", value: 60 },
  { name: "LessonHourlyRate", type: "Float", value: "28" },
  { name: "Students", type: "Array" },
];*/

const student = ["name", "status"];

export const courses = {
  Kursnummer: { type: "String" },
  Kunde: { type: "String" },
  Dozentin: { type: "String", value: "Tiffany Neumann" },
  Titel: { type: "String", value: "Englisch-Sprachtraining" },
  Niveau: { type: "String" },
  Wochentag: { type: "String" },
  Zeit: { type: "Time" },
  Start_Datum: { type: "Date" },
  Ende_Datum: { type: "Date" },
  //Bis: { type: "Time" },
  Buch: { type: "String" },
  Km: { type: "Float" },
  // kilometerkosten: { type: "Float", value: "0.3" }, stays the same
  // anzahl_ue: { type: "String", value: "60" },
  anzahl_zeitstunden: { type: "String", value: "1.5" },
  honorar: { type: "String", value: "25" },
  Student: { type: "Array", size: 0, fields: student },
};

export const lesson = {
  // course: { type: "Dropdown", data: "courses" }, course fields as input
  datum: { type: "Date" },
  Unterrichtsinhalt: { type: "String" },
  // Unterschrift
};

/*export const lesson = {
  customerName: { type: "String" },
  teacher: { type: "String", value: "Tiffany Neumann" },
  title: { type: "String" },
  level: { type: "String" },
  date: { type: "Date" },
  timeFrom: { type: "Time" },
  timeTo: { type: "Time" },
  book: { type: "String" },
  distance: { type: "Float" },
  costPerKilometer: { type: "Float", value: "0.3" },
  lessonDurationMinutes: { type: "Integer", value: 60 },
  LessonHourlyRate: { type: "Float", value: "28" },
  Student: { type: "Array", size: 0, fields: student },
};*/

export const activityTypes = [
  "Büroarbeit",
  "Weiterbildung / Arbeitstreffen",
  "Betriebsausflug",
  "Krankheit ohne gelben Schein",
  "Krankheit mit gelbem Schein",
  "Urlaub",
  "Feiertrage",
];

export const activity = { month: "", activityType: "", hours: "" };
