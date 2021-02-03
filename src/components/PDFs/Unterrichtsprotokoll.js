import { useContext, useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, TextField } from "@material-ui/core";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import PrintIcon from "@material-ui/icons/Print";
import SaveIcon from "@material-ui/icons/Save";
import CircularProgress from "@material-ui/core/CircularProgress";

import logo from "./Logo Antipolis.png";
import signature from "./Signature-Tiffy.png";
import { DataContext } from "../../api/DataContext";

const useStyles = makeStyles((theme) => ({
  filterAndButton: {},
  date: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "1em",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
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
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    fontWeight: 900,
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
  tableHeaderCell: {
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
  tableHeaderFirstCell: {
    textAlign: "left",
    borderBottomStyle: "solid",
    borderBottomColor: "black",
    borderBottomWidth: "1px",
    padding: "5px",
    fontSize: "15px",
    width: "70px",
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
    height: "120px",
  },
  tableFirstCell: {
    textAlign: "left",
    borderBottomStyle: "solid",
    borderBottomColor: "black",
    borderBottomWidth: "1px",
    padding: "5px",
    fontSize: "15px",
    width: "70px",
    height: "120px",
  },
  input: {
    width: "100%",
    height: "100%",
    maxHeight: "200px",
    border: "none",
    outline: "none",
    margin: "none",
    padding: "1em, 1.5em",
    resize: "none",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontSize: "15px",
  },
  saveButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
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
  const classes = useStyles();
  const { courses } = useContext(DataContext);
  const [month, setMonth] = useState(() => {
    const now = new Date();
    function getMonth() {
      let month = "";
      if (now.getMonth() < 10) month = "0";
      return (month += now.getMonth());
    }
    const month = getMonth();
    return now.getFullYear() + "-" + month;
  });

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const wochentage = {
    Montag: 0,
    Dienstag: 1,
    Mittwoch: 2,
    Donnerstag: 3,
    Freitag: 4,
  };

  const sortedCourses = courses?.sort((c1, c2) => {
    if (wochentage[c1.Wochentag] < wochentage[c2.Wochentag]) {
      return -1;
    } else if (wochentage[c1.Wochentag] > wochentage[c2.Wochentag]) {
      return 1;
    } else {
      if (
        parseInt(c1.Zeit.substring(0, 2)) < parseInt(c2.Zeit.substring(0, 2))
      ) {
        return -1;
      } else if (
        parseInt(c1.Zeit.substring(0, 2)) > parseInt(c2.Zeit.substring(0, 2))
      ) {
        return 1;
      } else {
        return 0;
      }
    }
  });

  const pdfs = sortedCourses?.map((course) => {
    const filteredLessons = course.lessons?.filter((lesson) =>
      lesson.datum.includes(month)
    );
    return (
      <MyPDF key={course.id} course={{ ...course, lessons: filteredLessons }} />
    );
  });

  return (
    <div className={classes.filterAndButton}>
      <div className={classes.date}>
        <TextField
          id="filter"
          key="filter"
          label="Monat (YYYY-MM)"
          value={month}
          onChange={handleMonthChange}
          margin="normal"
        />
      </div>

      <Print
        //elementId="UnterrichtsprotokollPDF"
        elementId="PDFs"
        courseIds={sortedCourses?.map((c) => c.id)}
        documentName={"Minutes_" + month + ".pdf"}
      />
      {/*<MyPDF course={sampleInput} />*/}
      <div id="PDFs">{pdfs}</div>
    </div>
  );
}

function Print(props) {
  const classes = useStyles();
  const [print, setPrint] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (print) {
      setIsLoading(true);

      printPDFs(props.courseIds, props.documentName)
        .then(() => {
          console.log("saved PDF");
          setPrint(false);
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [print, props.documentName, props.courseIds]);

  function handleButton() {
    setPrint(true);
  }

  return (
    <div>
      {isLoading ? (
        <Button
          onClick={handleButton}
          variant="contained"
          startIcon={<CircularProgress />}
          disabled
          className={classes.button}
        />
      ) : (
        <Button
          onClick={handleButton}
          variant="contained"
          startIcon={<PrintIcon />}
          className={classes.button}
        >
          PRINT
        </Button>
      )}
    </div>
  );
}

async function printPDFs(courseIds, documentName) {
  const pdf = new jsPDF();

  await courseIds?.reduce(async (memo, id, index) => {
    await memo;
    const input = document.getElementById(id);
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    if (index >= 1) pdf.addPage();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
  }, undefined);

  pdf.save(documentName);
}

function MyPDF(props) {
  const classes = useStyles();
  //const data = "test";
  return (
    <div
      id={props.course.id}
      /*id="UnterrichtsprotokollPDF"*/ className={classes.root}
    >
      <div className={classes.header}>
        <img src={logo} alt="Logo" className={classes.logo} />
      </div>
      <div className={classes.headline}>
        <Typography variant="h4" color="initial">
          Unterrichtsprotokoll
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
            courseId: props.course.id,
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
        <PrettyTableHeaderCell key={text} first={true}>
          {text}
        </PrettyTableHeaderCell>
      );
    return <PrettyTableHeaderCell key={text}>{text}</PrettyTableHeaderCell>;
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
                <EditableCell
                  entryKey="Unterrichtsinhalt"
                  entryValue={row.Unterrichtsinhalt}
                  lesson={row}
                >
                  {row.Unterrichtsinhalt}
                </EditableCell>
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

function PrettyTableHeaderCell(props) {
  const classes = useStyles();

  if (props.first)
    return (
      <TableCell align="left" className={classes.tableHeaderFirstCell}>
        <Typography variant="inherit" color="initial">
          {props.children}
        </Typography>
      </TableCell>
    );

  return (
    <TableCell align="left" className={classes.tableHeaderCell}>
      <Typography variant="inherit" color="initial">
        {props.children}
      </Typography>
    </TableCell>
  );
}

function EditableCell(props) {
  const classes = useStyles();
  const { updateLesson } = useContext(DataContext);
  const [state, setState] = useState(props.entryValue);

  console.log(props);

  const handleClick = () => {
    let lesson = props.lesson;
    lesson[props.entryKey] = state;
    updateLesson(props.lesson.courseId, props.lesson.id, lesson);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setState(e.target.value);
  };

  return (
    <>
      <textarea
        onChange={handleChange}
        key={"update-" + props.entryKey}
        value={state}
        type="text"
        className={classes.input}
      />

      {state === props.entryValue ? (
        <></>
      ) : (
        <Button
          onClick={handleClick}
          //variant="contained"
          startIcon={<SaveIcon />}
          className={classes.saveButton}
        >
          Save
        </Button>
      )}
    </>
  );
}
