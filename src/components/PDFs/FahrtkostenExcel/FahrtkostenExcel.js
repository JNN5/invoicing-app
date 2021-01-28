import * as Excel from "exceljs/dist/es5/exceljs.browser.js";
import { saveAs } from "file-saver";

import Button from "@material-ui/core/Button";

import * as stylesStruc from "./stylesAndStructure";

const data = [
  stylesStruc.header,
  stylesStruc.empty,
  stylesStruc.empty,
  stylesStruc.table1Headeline,
  stylesStruc.empty,
  stylesStruc.table1Header,
  ...stylesStruc.table1RowStructureAndStyle,
  ...stylesStruc.table1RowStructureAndStyle,
  ...stylesStruc.table1RowStructureAndStyle,
  stylesStruc.table1Footer,
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

export default function FahrtkostenExcel() {
  const handleClick = () => {
    console.log("data", data);
    saveAsExcel(data);
  };
  return (
    <div>
      <Button onClick={handleClick}>Download Excel</Button>
    </div>
  );
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
