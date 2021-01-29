export const styles = {
  default: {
    font: { size: "10", name: "Arial" },
  },
  h1: {
    font: { size: 14, bold: true, name: "Arial" },
  },
  h2: {
    font: { size: 11, bold: true, name: "Arial" },
  },
  tableHeader: {
    font: { size: 10, bold: true, name: "Arial" },
    border: {
      top: { style: "thin", color: { argb: "000000" } },
      bottom: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
    },
  },
  tableHeaderFill: {
    font: { size: 10, name: "Arial", bold: true },
    border: {
      top: { style: "thin", color: { argb: "000000" } },
      bottom: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
    },
    alignment: { vertical: "middle", horizontal: "right" },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "00D5F9FE" } },
  },
  tableFooter: {
    font: { size: 11, bold: true },
    border: {
      top: { style: "thin", color: { argb: "000000" } },
      bottom: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
    },
  },
  tableFooterFill: {
    font: { size: 11, name: "Arial", bold: true },
    border: {
      top: { style: "thin", color: { argb: "000000" } },
      bottom: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
    },
    alignment: { vertical: "middle", horizontal: "right" },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "00D5F9FE" } },
  },
  borderRight: {
    font: { size: 10, name: "Arial" },
    border: {
      right: { style: "thin", color: { argb: "000000" } },
    },
  },
  borderRightFill: {
    font: { size: 10, name: "Arial" },
    border: {
      right: { style: "thin", color: { argb: "000000" } },
    },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "00D5F9FE" } },
    alignment: { vertical: "middle", horizontal: "right" },
  },
  borderTopRight: {
    font: { size: 10, name: "Arial" },
    border: {
      top: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
    },
  },
  borderTopRightFill: {
    font: { size: 10, name: "Arial" },
    border: {
      top: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
    },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "00D5F9FE" } },
    alignment: { vertical: "middle", horizontal: "right" },
  },
  borderBottomRight: {
    font: { size: 10, name: "Arial" },
    border: {
      bottom: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
    },
  },
  borderBottomRightFill: {
    font: { size: 10, name: "Arial" },
    border: {
      bottom: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
    },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "00D5F9FE" } },
    alignment: { vertical: "middle", horizontal: "right" },
  },
  borderTopBottom: {
    font: { size: 10, name: "Arial" },
    border: {
      top: { style: "thin", color: { argb: "000000" } },
      bottom: { style: "thin", color: { argb: "000000" } },
    },
  },
  borderTopBottomRight: {
    font: { size: 10, name: "Arial" },
    border: {
      top: { style: "thin", color: { argb: "000000" } },
      bottom: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
    },
  },
  gesamtreisekosten: {
    font: { size: 11, name: "Arial", bold: true },
    border: {
      top: { style: "thin", color: { argb: "000000" } },
      bottom: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
    },
    alignment: { vertical: "middle", horizontal: "right" },
  },
};

export const header = [
  { width: 20, value: "NAME:", style: styles.h1 },
  { width: 27, value: "Tiffany Neumann", style: styles.h1 },
  { width: 29, value: "MONAT:", style: styles.h1 },
  { width: 12, value: "<MONTH>", style: styles.h1 },
  { width: 17, value: "", style: styles.h1 },
  { width: 12, value: "<YEAR>", style: styles.h1 },
  { width: 12, value: "", style: styles.default },
  { width: 12, value: "", style: styles.default },
  { width: 12, value: "", style: styles.default },
];

export const table1Headeline = [
  { value: "Unterrichtstätigkeit", style: styles.h2 },
  { value: "" },
  { value: "" },
  { value: "" },
  { value: "" },
  { value: "" },
  { value: "" },
  { value: "" },
  { value: "" },
];

export const table1Header = [
  { value: "Kunde", style: styles.tableHeader },
  { value: "Kursnummer", style: styles.tableHeader },
  { value: "Daten", style: styles.tableHeader },
  { value: "Anzahl UE", style: styles.tableHeader },
  { value: "Anzahl Zeitstunden", style: styles.tableHeader },
  { value: "km", style: styles.tableHeader },
  { value: "Fahrten", style: styles.tableHeader },
  { value: "Faktor", style: styles.tableHeader },
  { value: "Reisekosten", style: styles.tableHeaderFill },
];

export const table1RowStructureAndStyle = [
  [
    ...new Array(8).fill({ value: "top", style: styles.borderTopRight }),
    { value: "top", style: styles.borderTopRightFill },
  ],
  [
    ...new Array(8).fill({ value: "middle", style: styles.borderRight }),
    { value: "middle", style: styles.borderRightFill },
  ],
  [
    ...new Array(8).fill({ value: "bottom", style: styles.borderBottomRight }),
    { value: "bottom", style: styles.borderBottomRightFill },
  ],
];

export const table1Footer = [
  { value: "Gesamtstunden", style: styles.tableFooter },
  { value: "", style: styles.borderTopBottom },
  { value: "", style: styles.borderTopBottom },
  { value: "", style: styles.borderTopBottom },
  { value: "74,00", style: styles.tableFooter },
  { value: "", style: styles.borderTopBottom },
  { value: "", style: styles.borderTopBottom },
  { value: "Gesamtreisekosten", style: styles.gesamtreisekosten },
  { value: "73,20", style: styles.tableFooterFill },
];

export const table2Header = [
  { value: "Bürotätigkeit", style: styles.tableHeader },
  { value: "Tätigkeiten", style: styles.tableHeader },
  { value: "Daten", style: styles.tableHeader },
  { value: "Stunden", style: styles.tableHeader },
];

export const table2Footer = [
  { value: "Gesamt Bürotätigkeit", style: styles.tableFooter },
  { value: "", style: styles.borderTopBottom },
  { value: "", style: styles.tableFooter },
  { value: "0,00", style: styles.tableFooter },
];

export const table3Header = [
  { value: "Sonstiges", style: styles.tableHeader },
  { value: "Daten", style: styles.borderTopBottom },
  { value: "", style: styles.tableHeader },
  { value: "Gesamttage", style: styles.tableHeader },
];

export const table3Footer = [
  { value: "Gesamt Sonstiges", style: styles.tableFooter },
  { value: "", style: styles.borderTopBottom },
  { value: "", style: styles.tableFooter },
  { value: "0,00", style: styles.tableFooter },
];

export const table4Header = [
  { value: "Bruttoverdienst", style: styles.h1 },
  { value: "", style: styles.default },
  { value: "", style: styles.default },
  { value: "", style: styles.default },
];

export const table4Footer = [
  { value: "Summe", style: styles.h2 },
  { value: "", style: styles.default },
  { value: "", style: styles.default },
  { value: "0,00", style: styles.h2 },
];

export const empty = new Array(9).map(() => {
  return { value: "" };
});
