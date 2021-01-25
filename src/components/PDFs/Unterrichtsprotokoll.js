import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import PrintIcon from "@material-ui/icons/Print";

import logo from "./Logo Antipolis.png";
import signature from "./Signature-Tiffy.png";
import useLocalStorage from "../../api/useLocalStorage";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    width: "10%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "2em",
  },
  root: {
    display: "grid",
    gridTemplateRows: "120px 60px 100px auto 100px",
    textAlign: "center",
    backgroundColor: "white",
    width: "793.706px", // PDF A4 size
    height: "1122.52px", // PDF A4 size
    margin: "auto",
  },
  logo: {
    width: "100%",
  },
  header: {
    flexGrow: 1,
    paddingTop: "3em",
  },
  headline: {
    textDecoration: "underline",
    fontWeight: "bold",
    marginTop: "3em",
  },
  tableContainer: {
    verticalAlign: "top",
    marginTop: "2em",
  },
  table: {
    marginLeft: "15%",
    marginRight: "15%",
    width: "70%",
  },
  tableCell: {
    textAlign: "left",
    //fontFamily: "Century Gothic,CenturyGothic,AppleGothic,sans-serif",
    //fontWeight: "100",
    padding: "5px",
    borderLeftStyle: "solid",
    borderLeftColor: "black",
    borderLeftWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: "black",
    borderBottomWidth: "1px",
    fontSize: "15px",
    maxWidth: "200px",
  },
  tableFirstCell: {
    textAlign: "left",
    borderBottomStyle: "solid",
    borderBottomColor: "black",
    borderBottomWidth: "1px",
    padding: "5px",
    fontSize: "15px",
    width: "70px",
  },
  signature: {
    width: "80px",
  },
  infoGrid: {
    // gridTemplateColumns: "auto auto",
    // gridGap: "4em",
    padding: "2em",
    marginTop: "3em",
    marginBottom: "2.5em",
  },
  textLeft: {
    display: "inline-block",
    marginRight: "1em",
    // textAlign: "left",
  },
  textRight: {
    display: "inline-block",
    marginLeft: "1em",
    // textAlign: "right",
  },
  footer: {
    verticalAlign: "bottom",
    marginTop: "2em",
    marginLeft: "auto",
    marginRight: "auto",
    borderTopStyle: "solid",
    borderTopWidth: "2px",
    borderTopColor: "#dd2a49",
    width: "95%",
    alignContent: "center",
  },
  footerElement: {
    display: "inline-block",
    marginLeft: "0.1em",
    marginRight: "0.1em",
    padding: "3px",
    color: "#333",
    fontSize: "11px",
    paddingTop: "0px",
    paddingBottom: "0px",
    marginTop: "0px",
    marginBottom: "0px",
  },
}));
export default function Unterrichtsprotokoll() {
  // const classes = useStyles();
  const [courses] = useLocalStorage("courses");

  const sampleCourse = courses[1];
  const sampleFilteredLessons = sampleCourse.lessons.filter((lesson) =>
    lesson.datum.includes("2021-01")
  );
  const sampleInput = {
    ...sampleCourse,
    lessons: sampleFilteredLessons,
  };

  console.log("sampleInput: ", sampleInput);

  return (
    <div>
      <Print
        elementId="UnterrichtsprotokollPDF"
        documentName="Unterrichtsprotokoll.pdf"
      />
      <MyPDF course={sampleInput} />
    </div>
  );
}

function Print(props) {
  const classes = useStyles();
  const [print, setPrint] = useState(false);

  useEffect(() => {
    if (print) {
      const input = document.getElementById(props.elementId);

      html2canvas(input)
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF();
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
          pdf.save(props.documentName);
          console.log("saved PDF");
          setPrint(false);
        })
        .catch((error) => console.log(error));
    }
  });

  function handleButton() {
    setPrint(true);
  }

  return (
    <div>
      <Button
        onClick={handleButton}
        variant="contained"
        startIcon={<PrintIcon />}
        className={classes.button}
      />
    </div>
  );
}

function MyPDF(props) {
  const classes = useStyles();
  //const data = "test";
  return (
    <div id="UnterrichtsprotokollPDF" className={classes.root}>
      <div className={classes.header}>
        <img src={logo} alt="Logo" className={classes.logo} />
      </div>
      <div className={classes.headline}>
        <Typography variant="h4" color="initial">
          <b>Unterrichtsprotokoll</b>
        </Typography>
      </div>
      <div className={classes.infoGrid}>
        <Typography
          variant="inherit"
          color="initial"
          className={classes.textLeft}
        >
          Kursnummer: ____{props.course?.Kursnummer || "270 1603"}____
        </Typography>
        <Typography
          variant="inherit"
          color="initial"
          className={classes.textRight}
        >
          Dozentin: ____{props.course?.Dozentin || "TIFFANY NEUMANN"}____
        </Typography>
      </div>
      <MyTable
        rows={props.course?.lessons?.map((lesson) => {
          return {
            ...lesson,
            ort: props.course.Kunde,
            time: props.course.Zeit,
          };
        })}
      />
      <div className={classes.footer}>
        <div>
          <Typography variant="inherit" className={classes.footerElement}>
            Bolbrinkersweg 1
          </Typography>
          <Typography variant="inherit" className={classes.footerElement}>
            33617 Bielefeld
          </Typography>
          <Typography variant="inherit" className={classes.footerElement}>
            .
          </Typography>
          <Typography variant="inherit" className={classes.footerElement}>
            Sieglingsstraße 8
          </Typography>
          <Typography variant="inherit" className={classes.footerElement}>
            12159 Berlin
          </Typography>
        </div>
        <div>
          <Typography variant="inherit" className={classes.footerElement}>
            www.antipolis.de
          </Typography>
          <Typography variant="inherit" className={classes.footerElement}>
            .
          </Typography>
          <Typography variant="inherit" className={classes.footerElement}>
            info@antipolis.de
          </Typography>
        </div>
      </div>
    </div>
  );
}

function MyTable(props) {
  const classes = useStyles();
  const TableHeaderCells = [
    "Ort",
    "Datum",
    "Uhrzeit",
    "Unterrichtsinhalt",
    "Unterschrift",
  ].map((text) => {
    if (text === "Ort")
      return (
        <PrettyTableCell key={text} first={true}>
          {text}
        </PrettyTableCell>
      );
    return <PrettyTableCell key={text}>{text}</PrettyTableCell>;
  });

  const formatDate = (date) => {
    return (
      date.substring(8, 10) +
      "." +
      date.substring(5, 7) +
      "." +
      date.substring(0, 4)
    );
  };
  return (
    <div className={classes.tableContainer}>
      <Table className={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow key="headers">{TableHeaderCells}</TableRow>
        </TableHead>
        <TableBody>
          {props.rows?.map((row, index) => (
            <TableRow key={row.name + index}>
              <PrettyTableCell
                key={index + row.ort}
                first={true}
                component="th"
                scope="row"
              >
                {row.ort}
              </PrettyTableCell>
              <PrettyTableCell key={index + row.datum} align="left">
                {formatDate(row.datum)}
              </PrettyTableCell>
              <PrettyTableCell key={index + row.time} align="left">
                {row.time}
              </PrettyTableCell>
              <PrettyTableCell key={index + row.Unterrichtsinhalt} align="left">
                {row.Unterrichtsinhalt ||
                  "aaaaaaaafhjadfsja slkdjhas kld jfhal ksd fhalk sjdf hlweiu fhla skjdbl ia wuef balisudbf ai lw uefbl aksd jfba liweufb galsk dj fbalwie ufbgl skdjf baeil uwfblsi"}
              </PrettyTableCell>
              <PrettyTableCell key={index + "signature"} align="left">
                <img src={signature} alt="Logo" className={classes.signature} />
              </PrettyTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function PrettyTableCell(props) {
  const classes = useStyles();

  if (props.first)
    return (
      <TableCell align="left" className={classes.tableFirstCell}>
        <Typography variant="inherit" color="initial">
          {props.children}
        </Typography>
      </TableCell>
    );

  return (
    <TableCell align="left" className={classes.tableCell}>
      <Typography variant="inherit" color="initial">
        {props.children}
      </Typography>
    </TableCell>
  );
}
