import { FilePicker } from "react-file-picker";

import { Button } from "@material-ui/core";
import { useContext } from "react";
import { DataContext } from "../../api/DataContext";

export default function Admin() {
  const { courses, restoreData, createCourse, backupData } = useContext(
    DataContext
  );

  const onChange = (file) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      restoreData(e.target.result);
    };
  };

  const courseList = courses?.map((c) => (
    <p key={"p" + c.Kursnummer}>{c.Kursnummer}</p>
  ));

  let existingCourses = {};
  courses?.map((c) => (existingCourses[c.Kursnummer] = true));

  const buttonList = tmp
    .filter((c) => !existingCourses[c.Kursnummer])
    .map((course) => (
      <Button
        key={"btn" + course.Kursnummer}
        onClick={() => {
          createCourse(course);
        }}
      >
        create {course.Kursnummer}
      </Button>
    ));

  return (
    <div>
      <Button variant="contained">
        <a
          href={
            "data:text/json;charset=utf-8," + encodeURIComponent(backupData())
          }
          download={
            "backup_" + new Date().toISOString().substring(0, 19) + ".json"
          }
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
      <div key="admin-courseList">{courseList}</div>
      <div key="admin-buttonList">{buttonList}</div>
    </div>
  );
}

const tmp = [
  {
    Kursnummer: "270 1848",
    Kunde: "Ecclesia Holding GmbH",
    Niveau: "A2",
    Wochentag: "Dienstag",
    Zeit: "13:45",
    Start_Datum: "2021-01-05",
    Ende_Datum: "2021-04-27",
    Buch: "Insurance Matters",
    Km: "28",
    honorar: "28",
    "Student 0": "Miles Westphal",
    "Student 1": "Jana Hartmann",
    "Student 2": "Luca Többens",
    "Student 3": "Marisa Hinder",
    "Student 4": "Marvin Krein",
    "Student 5": "Bettina Warkentin",
    "Student 6": "Diana Schernich",
    "Student 7": "Ines Ring",
    "Student 8": "Marie Götemann",
  },

  {
    Kursnummer: "270 813",
    Kunde: "ARI Armaturen",
    Niveau: "B1",
    Wochentag: "Montag",
    Zeit: "09:00",
    Start_Datum: "2021-01-04",
    Ende_Datum: "2021-12-31",
    Buch: "-",
    Km: "58",
    honorar: "28",
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
  },

  {
    Kursnummer: "270 1603",
    Kunde: "ARI Armaturen",
    Niveau: "A2",
    Wochentag: "Montag",
    Zeit: "10:30",
    Start_Datum: "2021-01-04",
    Ende_Datum: "2021-12-31",
    Buch: "-",
    Km: "58",
    honorar: "28",
    "Student 0": "Björn Sander",
    "Student 1": "Yannick Bollweg",
    "Student 2": "Luca Dreisöner",
    "Student 3": "Welat Akay",
    "Student 4": "Marc Philip Klassen",
    "Student 5": "Nils Thorben",
    "Student 6": "Tristan Seemann",
    "Student 7": "Nick Strothmann",
  },

  {
    Kursnummer: "270 1869",
    Kunde: "ARI Armaturen",
    Niveau: "B1",
    Wochentag: "Montag",
    Zeit: "12:15",
    Start_Datum: "2021-01-04",
    Ende_Datum: "2021-12-31",
    Buch: "-",
    Km: "58",
    honorar: "28",
    "Student 0": "Lars Meier",
    "Student 1": "Philipp Möller",
    "Student 2": "Marcel Müchler",
    "Student 3": "Niklas Neiske",
    "Student 4": "Frederick Niekamp",
    "Student 5": "Lars Pfeiffer",
    "Student 6": "Aaron Plieg",
    "Student 7": "Leonard Schröder",
    "Student 8": "Leon Siek",
    "Student 9": "Julian Sielhorst",
    "Student 10": "Valentina Staletovic",
    "Student 11": "Jonas Sykosch",
    "Student 12": "Christian Teipel",
  },

  {
    Kursnummer: "270 1665",
    Kunde: "Miele Bielefeld",
    Niveau: "A1/A2",
    Wochentag: "Montag",
    Zeit: "15:05",
    Start_Datum: "2021-01-04",
    Ende_Datum: "2021-12-31",
    Buch: "Business English for Beginners",
    Km: "63",
    honorar: "28",
    "Student 0": "Alexander Kraft",
    "Student 1": "Christian Sundermeier",
    "Student 2": "Uwe Hetland",
    "Student 3": "Julian Bonin",
    "Student 4": "Tobias Malec",
  },

  {
    Kursnummer: "270 1805",
    Kunde: "PreZero Recycling",
    Niveau: "A2/B1",
    Wochentag: "Mittwoch",
    Zeit: "10:15",
    Start_Datum: "2021-01-06",
    Ende_Datum: "2021-12-31",
    Buch: "Business English for Beginners",
    Km: "98",
    honorar: "28",
    "Student 0": "Anna Berg",
    "Student 1": "Stefanie Boese",
    "Student 2": "Jennifer Cub",
    "Student 3": "Cordula Eikmeier",
    "Student 4": "Claudia Hoppe",
    "Student 5": "Lea Kirfel",
    "Student 6": "Lisa Reineke",
    "Student 7": "Jennifer Meier",
    "Student 8": "Tanja Kunze",
  },

  {
    Kursnummer: "270 1725",
    Kunde: "Jowat",
    Niveau: "A2",
    Wochentag: "Mittwoch",
    Zeit: "16:00",
    Start_Datum: "2021-01-06",
    Ende_Datum: "2021-12-31",
    Buch: "In Company 3.0 Elementary",
    Km: "26",
    honorar: "28",
    "Student 0": "Simone Bekk",
    "Student 1": "Annette Fröner",
    "Student 2": "Beytullah Sahin",
    "Student 3": "Artjom Martel",
    "Student 4": "Elmir Velispahic",
    "Student 5": "Peter Strunk",
    "Student 6": "Johann Friesen",
  },

  {
    Kunde: "Ecclesia Holding GmbH",
    Kursnummer: "270 1849",
    Niveau: "B1",
    Wochentag: "Donnerstag",
    Zeit: "13:45",
    Start_Datum: "2021-01-07",
    Ende_Datum: "2021-12-31",
    Buch: "Insurance Matters",
    Km: "28",
    honorar: "28",
    "Student 0": "Christian Kück",
    "Student 1": "Tobias Brandt",
    "Student 2": "Jan Rott",
    "Student 3": "Tamina Grönemeier",
    "Student 4": "Emma Weiland",
    "Student 5": "Sandro Warzecha",
    "Student 6": "Julia Harms",
    "Student 7": "Jonas Schmidt",
    "Student 8": "Mirko Sussiek",
    "Student 9": "Karoline Warm",
    "Student 10": "Laura Hölscher",
    "Student 11": "Niklas Kramer",
    "Student 12": "Elisabeth Schütz",
    "Student 13": "Tim Rippel",
  },

  {
    Kursnummer: "270 1806",
    Kunde: "PreZero Recycling",
    Niveau: "B1",
    Wochentag: "Mittwoch",
    Zeit: "12:00",
    Start_Datum: "2021-01-06",
    Ende_Datum: "2021-12-31",
    Buch: "Basis for Business",
    Km: "98",
    honorar: "28",
    "Student 0": "Kristin Große",
    "Student 1": "Tristan Merk",
    "Student 2": "Andreas Thiel",
    "Student 3": "Pascal Wallat",
  },

  {
    Kursnummer: "270 1866",
    Kunde: "Ecclesia Holding GmbH",
    Niveau: "A2",
    Wochentag: "Dienstag",
    Buch: "Insurance Matters",
    Start_Datum: "2021-01-05",
    Ende_Datum: "2021-12-31",
    Km: "28",
    Zeit: "15:15",
    honorar: "28",
    "Student 0": "Danicia Brungs",
    "Student 1": "Daniel Reicheld",
    "Student 2": "Anika Bartodziej",
    "Student 3": "Lotta Beckmann",
    "Student 4": "Ann-Kathrin Bracht",
    "Student 5": "Nina Marie Dieckmann",
    "Student 6": "Tetje Klocker",
    "Student 7": "Jennifer Kettler",
    "Student 8": "Lydia Töws",
    "Student 9": "Mandy Wyludda",
  },

  {
    Kursnummer: "270 1867",
    Kunde: "Ecclesia Holding GmbH",
    Niveau: "B1/B2",
    Wochentag: "Donnerstag",
    Zeit: "15:15",
    Start_Datum: "2021-01-07",
    Ende_Datum: "2021-12-31",
    Buch: "Insurance Matters",
    Km: "28",
    honorar: "28",
    "Student 0": "Tom Hering",
    "Student 1": "Florian Schönlau",
    "Student 2": "Nico Busekros",
    "Student 3": "Stefan Dall",
    "Student 4": "Jonas Giefers",
    "Student 5": "Sven Krause",
    "Student 6": "Niklas Kurte",
    "Student 7": "Celine Locker",
    "Student 8": "Tim Overbeck",
    "Student 9": "Doreen Pohl",
    "Student 10": "Justus Warm",
    "Student 11": "Alina Zürn",
  },

  {
    Kursnummer: "270 1831",
    Kunde: "ISRINGHAUSEN GmbH & Co. KG",
    Niveau: "B2",
    Wochentag: "Donnerstag",
    Zeit: "07:30",
    Start_Datum: "2021-02-04",
    Ende_Datum: "2021-12-31",
    Buch: "Basis for Business",
    Km: "6",
    honorar: "28",
    "Student 0": "Torben Oriol",
    "Student 1": "Julia Schitz",
    "Student 2": "Phillip Hartfelder",
    "Student 3": "Konstanze Gemsa",
    "Student 4": "Andreas Schiendorfer",
    "Student 5": "Timo Korsmeier",
    "Student 6": "Lena Hülsmann",
  },

  {
    Kursnummer: "270 1832",
    Kunde: "ISRINGHAUSEN GmbH & Co. KG",
    Niveau: "A2",
    Wochentag: "Donnerstag",
    Zeit: "09:15",
    Start_Datum: "2021-01-07",
    Ende_Datum: "2021-12-31",
    Buch: "Business Result",
    Km: "6",
    honorar: "28",
    "Student 0": "Matthias Eßbach",
    "Student 1": "Boris Haubrich",
    "Student 2": "Nico Horstmann",
    "Student 3": "Alexander Sabadasch",
    "Student 4": "Cihan Saritekin",
    "Student 5": "Valentina Schlegel",
  },
];
