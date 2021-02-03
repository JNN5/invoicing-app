import * as Excel from "exceljs/dist/es5/exceljs.browser.js";
import { saveAs } from "file-saver";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import * as stylesStruc from "./stylesAndStructure";

import { useContext, useState } from "react";
import { DataContext } from "../../../api/DataContext";

const KILOMETERKOSTEN = 0.3;

export default function FahrtkostenExcel() {
  const { courses } = useContext(DataContext);
  //const [data, setData] = useState([]);
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return now.getFullYear() + "-" + now.getMonth() + 1;
  });

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleClick = () => {
    putCoursesInStructure(
      courses?.map((course) => {
        const filteredLessons = course.lessons.filter((item) =>
          item.datum.includes(month)
        );
        return { ...course, lessons: filteredLessons };
      }),
      month
    )
      .then((res) => saveAsExcel(res))
      .catch((error) => console.log(error));
    //saveAsExcel(data);
  };
  return (
    <div>
      <TextField
        id="filter"
        key="filter"
        label="Monat (YYYY-MM)"
        value={month}
        onChange={handleMonthChange}
        margin="normal"
      />
      <Button onClick={handleClick}>Download Excel</Button>
    </div>
  );
}

async function putCoursesInStructure(courses, month) {
  const header = putDataInHeaderInStructure(month);
  const table1 = putDataInTable1Structure(courses);
  // const table2 = [];
  // const table3 = [];
  // const table4 = [];

  return [
    header,
    stylesStruc.empty,
    stylesStruc.empty,
    stylesStruc.table1Headeline,
    stylesStruc.empty,
    stylesStruc.table1Header,
    ...table1,
    stylesStruc.empty,
    stylesStruc.table2Header,
    stylesStruc.table2Footer,
    stylesStruc.empty,
    stylesStruc.table3Header,
    stylesStruc.table3Footer,
    stylesStruc.empty,
    stylesStruc.table4Header,
    stylesStruc.table4Footer,
  ];
}

function putDataInHeaderInStructure(month) {
  const month3LetterArray = [
    "Jan",
    "Feb",
    "Mär",
    "Apr",
    "Mai",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dez",
  ];
  const replaceMonthDigitWithWord = (m) => month3LetterArray[m - 1];

  const m = replaceMonthDigitWithWord(month.substring(6, 8));
  const y = month.substring(0, 4);

  const header = [
    { width: 20, value: "NAME:", style: stylesStruc.styles.h1 },
    { width: 27, value: "Tiffany Neumann", style: stylesStruc.styles.h1 },
    { width: 29, value: "MONAT:", style: stylesStruc.styles.h1 },
    { width: 12, value: "<MONTH>", style: stylesStruc.styles.h1 },
    { width: 17, value: "", style: stylesStruc.styles.h1 },
    { width: 12, value: "<YEAR>", style: stylesStruc.styles.h1 },
    { width: 12, value: "", style: stylesStruc.styles.default },
    { width: 12, value: "", style: stylesStruc.styles.default },
    { width: 12, value: "", style: stylesStruc.styles.default },
  ];

  return header.map((cell) => {
    if (cell.value === "<MONTH>") cell.value = m;
    if (cell.value === "<YEAR>") cell.value = y;
    return cell;
  });
}

function putDataInTable1Structure(courses) {
  let sumHours = 0;
  let sumTravelcost = 0;
  let tableRows = courses.map((course) => {
    const numberOfLessons = course.lessons?.length || 0;
    const hours = course.lessons?.length || 0 * 1.5;
    sumHours += hours;
    const travelcost =
      parseFloat(numberOfLessons) * parseFloat(course.Km) * KILOMETERKOSTEN;
    sumTravelcost += travelcost;
    return [
      { value: course.Kunde, style: stylesStruc.styles.borderTopBottomRight },
      {
        value: course.Kursnummer,
        style: stylesStruc.styles.borderTopBottomRight,
      },
      {
        value:
          JSON.stringify(course.lessons?.map((lesson) => lesson.datum)) || "",
        style: stylesStruc.styles.borderTopBottomRight,
      },
      {
        value: numberOfLessons,
        style: stylesStruc.styles.borderTopBottomRight,
      },
      {
        value: hours,
        style: stylesStruc.styles.borderTopBottomRight,
      },
      { value: course.Km, style: stylesStruc.styles.borderTopBottomRight },
      {
        value: numberOfLessons, // TO BE CHANGED TO FAHRTEN
        style: stylesStruc.styles.borderTopBottomRight,
      },
      { value: 1, style: stylesStruc.styles.borderTopBottomRight },
      { value: 1, style: stylesStruc.styles.borderTopBottomRight },
      {
        value: travelcost,
        style: stylesStruc.styles.borderTopBottomRightFill,
      },
    ];
  });
  tableRows.push([
    { value: "GesamtStunden", style: stylesStruc.styles.tableFooter },
    { value: "", style: stylesStruc.styles.borderTopBottom },
    { value: "", style: stylesStruc.styles.borderTopBottom },
    { value: "", style: stylesStruc.styles.borderTopBottom },
    { value: "", style: stylesStruc.styles.borderTopBottom },
    { value: sumHours, style: stylesStruc.styles.tableFooter },
    { value: "", style: stylesStruc.styles.tableFooter },
    { value: "", style: stylesStruc.styles.tableFooter },
    {
      value: "Gesamtreisekosten",
      style: stylesStruc.styles.gesamtreisekosten,
    },
    {
      value: sumTravelcost,
      style: stylesStruc.styles.tableFooterFill,
    },
  ]);
  return tableRows;
}

async function saveAsExcel(data) {
  const wb = new Excel.Workbook();

  const ws = wb.addWorksheet();

  const columns = data.shift();

  ws.columns = columns.map((c) => {
    let obj = {
      header: c.value,
      key: c.value,
      width: c.width,
      style: c.style,
    };

    return obj;
  });

  ws.columns = columns;

  data.forEach((array) => {
    const row = ws.addRow(array.map((v) => v.value || ""));
    array
      .filter((cell) => cell.style)
      .forEach((cell, index) => {
        Object.entries(cell.style).forEach(([key, value]) => {
          row._cells[index][key] = value;
        });
      });

    //console.log(row);
    //row.font = { bold: true };
  });

  const buf = await wb.xlsx.writeBuffer();

  saveAs(new Blob([buf]), "Fahrtkosten.xlsx");
}
