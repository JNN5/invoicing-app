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
import CircularProgress from "@material-ui/core/CircularProgress";

import logo from "./Logo Antipolis.png";
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
    gridTemplateRows: "120px 100px 200px auto 100px",
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
    fontWeight: "bold",
    marginTop: "3em",
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: "1px",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#CCC",
    paddingTop: "4px",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    marginTop: "2em",
    paddingTop: "3px",
    //marginBottom: "1em",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: "1px",
  },
  textInforgrid: {
    display: "block",
    textAlign: "left",
    padding: "5px",
    marginLeft: "10px",
    marginRight: "10px",
  },
  tableContainer: {
    verticalAlign: "top",
    marginTop: "2em",
  },
  table: {
    marginLeft: "10%",
    marginRight: "10%",
    width: "80%",
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "15px",
    paddingRight: "15px",
  },
  tableCell: {
    textAlign: "center",
    //fontFamily: "Century Gothic,CenturyGothic,AppleGothic,sans-serif",
    //fontWeight: "100",
    padding: "5px",
    borderLeftStyle: "solid",
    borderLeftColor: "black",
    borderLeftWidth: "1px",
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: "1px",
    fontSize: "15px",
    maxWidth: "200px",
  },
  tableFirstCell: {
    textAlign: "center",
    padding: "5px",
    borderLeftStyle: "solid",
    borderLeftColor: "black",
    borderLeftWidth: "1px",
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: "1px",
    fontSize: "15px",
    width: "250px",
  },
  textRight: {
    paddingRight: "15px",
    textAlign: "right",
    fontWeight: "bold",
  },
  textLeft: {
    paddingLeft: "15px",
    textAlign: "left",
    fontWeight: "bold",
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
export default function Anwesenheitsliste() {
  // const classes = useStyles();
  const [courses] = useLocalStorage("courses");

  const pdfs = courses.map((course) => {
    const filteredLessons = course.lessons?.filter((lesson) =>
      lesson.datum.includes("2021-01")
    );
    return (
      <MyPDF key={course.id} course={{ ...course, lessons: filteredLessons }} />
    );
  });

  return (
    <div>
      <Print
        //elementId="UnterrichtsprotokollPDF"
        //elementId="PDFs"
        courseIds={courses.map((c) => c.id)}
        documentName="Anwesenheitsliste.pdf"
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
        />
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
    const imgData = canvas.toDataURL("image/png");
    if (index >= 1) pdf.addPage();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  }, undefined);

  pdf.save(documentName);
}

function MyPDF(props) {
  const classes = useStyles();

  return (
    <div id="AnwesenheitslistePDF" className={classes.root}>
      <Header />
      <Headline />
      <InfoGrid course={props.course} />
      <MyTable course={props.course} />
      <Footer />
    </div>
  );
}

function Header() {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <img src={logo} alt="Logo" className={classes.logo} />
    </div>
  );
}

function Headline() {
  const classes = useStyles();
  return (
    <div className={classes.headline}>
      <Typography variant="h4" color="initial">
        <b>Anwesenheitsliste</b>
      </Typography>
    </div>
  );
}

function InfoGrid(props) {
  const classes = useStyles();
  const addingHour = (minute) => {
    if ((minute + 30) / 60 >= 1) {
      return parseInt(1);
    } else {
      return parseInt(0);
    }
  };
  const computeEndDate = (time) => {
    const min = (parseInt(time.substring(3, 5)) + 30) % 60;
    const h =
      parseInt(time.substring(0, 2)) +
      1 +
      addingHour(parseInt(time.substring(3, 5)));
    return h + ":" + min;
  };
  return (
    <div className={classes.infoGrid}>
      <div className={classes.leftColumn} key="leftColumn">
        <Typography
          variant="inherit"
          color="initial"
          key={props.course.Kursnummer}
          className={classes.textInforgrid}
        >
          Kursnummer: {props.course.Kursnummer}
        </Typography>
        <Typography
          variant="inherit"
          color="initial"
          key={props.course.Kunde}
          className={classes.textInforgrid}
        >
          Kunde: {props.course.Kunde}
        </Typography>
        <Typography
          variant="inherit"
          color="initial"
          key={props.course.Kursnummer + "Titel"}
          className={classes.textInforgrid}
        >
          Titel: Englisch-Sprachtraining
        </Typography>
        <Typography
          variant="inherit"
          color="initial"
          key={props.course.Niveau}
          className={classes.textInforgrid}
        >
          Niveau: {props.course.Niveau}
        </Typography>
        <Typography
          variant="inherit"
          color="initial"
          key={props.course.Buch}
          className={classes.textInforgrid}
        >
          Buch: {props.course.Buch}
        </Typography>
      </div>
      <div className={classes.leftColumn} key="rightColumn">
        <Typography
          variant="inherit"
          color="initial"
          key={props.course.Kusnummer + "Dozentin"}
          className={classes.textInforgrid}
        >
          Dozentin: {props.course.Dozentin || "Tiffany Neumann"}
        </Typography>
        <Typography
          variant="inherit"
          color="initial"
          key={props.course.month}
          className={classes.textInforgrid}
        >
          Monat: {props.course.month}
        </Typography>
        <Typography
          variant="inherit"
          color="initial"
          key={props.course.Wochentag}
          className={classes.textInforgrid}
        >
          Wochentag: {props.course.Wochentag}
        </Typography>
        <Typography
          variant="inherit"
          color="initial"
          key={props.course.Zeit}
          className={classes.textInforgrid}
        >
          Zeit: {props.course.Zeit + " - " + computeEndDate(props.course.Zeit)}
        </Typography>
      </div>
    </div>
  );
}

function MyTable(props) {
  const classes = useStyles();

  const lessons = props.course?.lessons;

  const formatDate = (date) => {
    return (
      date.substring(8, 10) +
      "." +
      date.substring(5, 7) +
      "." +
      date.substring(0, 4)
    );
  };

  const dates = lessons?.map((lesson) => formatDate(lesson.datum));

  const tableHeaderData = ["#Name", ...dates];
  const tableHeaderRow = tableHeaderData.map((item) => {
    if (item === "#Name") {
      return (
        <PrettyTableCell key={item} first>
          <div className={classes.textRight}>Datum</div>
          <div className={classes.textLeft}>Name</div>
        </PrettyTableCell>
      );
    }
    return <PrettyTableCell key={item}>{item}</PrettyTableCell>;
  });

  const students = Object.keys(props.course)
    .filter((key) => key.startsWith("Student"))
    .map((key) => props.course[key]);

  const tableRowData = students?.map((student) => {
    const lessonEntries = lessons?.map((lesson) => {
      return (
        <PrettyTableCell key={lesson.datum + student} align="left">
          {lesson[student] ?? ""}
        </PrettyTableCell>
      );
    });
    return (
      <TableRow key={student + "row"}>
        <PrettyTableCell key={student} first>
          {student}
        </PrettyTableCell>
        {lessonEntries}
      </TableRow>
    );
  });

  return (
    <div className={classes.tableContainer}>
      <Table className={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow key="headers">{tableHeaderRow}</TableRow>
        </TableHead>
        <TableBody>{tableRowData}</TableBody>
      </Table>
    </div>
  );
}

function PrettyTableCell(props) {
  const classes = useStyles();

  if (props.first)
    return (
      <TableCell
        align="left"
        className={classes.tableFirstCell}
        component="th"
        scope="row"
      >
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

function Footer() {
  const classes = useStyles();
  return (
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
  );
}
