import React, { Component } from "react";
import ReactExport from "react-export-excel-fixed-xlsx";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const styles = {
  default: {
    font: { sz: "12" },
  },
  header: {
    font: { sz: 24, bold: true },
    border: { style: "thin", color: { rgb: "#000000" } },
  },
  tableHeader: {
    font: { sz: 24, bold: true },
  },
  tableLastColumn: {
    fill: { patternType: "solid", fgColor: { rgb: "FFFF0000" } },
  },
  tableFooter: {
    font: { sz: "24", bold: true },
  },
  borderRight: {
    border: {
      right: { style: "thin", color: { rgb: "000000" } },
    },
  },
  borderTopRight: {
    border: {
      top: { style: "thin", color: { rgb: "000000" } },
      right: { style: "thin", color: { rgb: "000000" } },
    },
  },
  borderBottomRight: {
    border: {
      bottom: { style: "thin", color: { rgb: "000000" } },
      right: { style: "thin", color: { rgb: "000000" } },
    },
  },
  borderTopBottomRight: {
    border: {
      top: { style: "thin", color: { rgb: "000000" } },
      bottom: { style: "thin", color: { rgb: "000000" } },
      right: { style: "thin", color: { rgb: "000000" } },
    },
  },
};

const columns = [
  { value: "A", widthPx: 100, style: { font: { sz: "12" } } },
  {
    value: "B",
    widthPx: 120,
    style: { font: { sz: "12" } },
  },
  {
    value: "C",
    widthPx: 120,
    style: { font: { sz: "12" } },
  },
  {
    value: "D",
    widthPx: 40,
    style: { font: { sz: "12" } },
  },
  {
    value: "E",
    widthPx: 80,
    style: { font: { sz: "12" } },
  },
  {
    value: "F",
    widthPx: 40,
    style: { font: { sz: "12" } },
  },
  {
    value: "G",
    widthPx: 40,
    style: { font: { sz: "12" } },
  },
  {
    value: "H",
    widthPx: 40,
    style: { font: { sz: "12" } },
  },
  {
    value: "I",
    widthPx: 60,
    style: { font: { sz: "12" } },
  },
];

const header = [
  { value: "NAME:", style: styles.header },
  { value: "Tiffany Neumann", style: styles.header },
  { value: "Monat:", style: styles.header },
  { value: "Nov:", style: styles.header },
  { value: "", style: styles.default },
  { value: "2020", style: styles.header },
  { value: "", style: styles.default },
  { value: "", style: styles.default },
  { value: "", style: styles.default },
];

const table1Headeline = [
  { value: "Unterrichtstätigkeit:", style: styles.tableHeader },
  { value: "" },
  { value: "" },
  { value: "" },
  { value: "" },
  { value: "" },
  { value: "" },
  { value: "" },
  { value: "" },
];

const empty = new Array(9).map(() => {
  return { value: "" };
});

const styledMultiDataSet = [
  {
    columns: columns, //columns.map((column) => JSON.stringify(column)),
    data: [
      header,
      empty,
      empty,
      table1Headeline,
      empty,
      //table1,
      //table2,
      //table3,
      /*[
        { value: "H1", style: { font: { sz: "24", bold: true } } },
        { value: "Bold", style: { font: { bold: true } } },
        {
          value: "Red",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "FFFF0000" } },
          },
        },
      ],*/
    ],
  },
];

const sample = [
  {
    columns: ["A", "B", "C"],
    data: [
      [
        { value: "H1", style: { font: { sz: "24", bold: true } } },
        { value: "Bold", style: { font: { bold: true } } },
        {
          value: "Red",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "FFFF0000" } },
          },
        },
      ],
      [
        { value: "H2", style: { font: { sz: "18", bold: true } } },
        { value: "underline", style: { font: { underline: true } } },
        {
          value: "Blue",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "FF0000FF" } },
          },
        },
      ],
      [
        { value: "H3", style: { font: { sz: "14", bold: true } } },
        { value: "italic", style: { font: { italic: true } } },
        {
          value: "Green",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "FF00FF00" } },
          },
        },
      ],
      [
        { value: "H4", style: { font: { sz: "12", bold: true } } },
        { value: "strike", style: { font: { strike: true } } },
        {
          value: "Orange",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "FFF86B00" } },
          },
        },
      ],
      [
        { value: "H5", style: { font: { sz: "10.5", bold: true } } },
        { value: "outline", style: { font: { outline: true } } },
        {
          value: "Yellow",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "FFFFFF00" } },
          },
        },
      ],
      [
        { value: "H6", style: { font: { sz: "7.5", bold: true } } },
        { value: "shadow", style: { font: { shadow: true } } },
        {
          value: "Light Blue",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
          },
        },
      ],
    ],
  },
];

export default function FahrtkostenExcel() {
  console.log(styledMultiDataSet);
  return (
    <div>
      <ExcelFile
        element={<button>Download Data With Styles</button>}
        filename="Fahrtkosten"
        fileExtension="xlsx"
      >
        <ExcelSheet dataSet={styledMultiDataSet} name="Fahrtkosten" />
      </ExcelFile>
    </div>
  );
}
