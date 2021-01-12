import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import logo from "./Logo Antipolis.png";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    backgroundColor: "white",
    margin: "50px",
  },
  logo: {
    width: "100%",
  },
  header: {
    flexGrow: 1,
  },
  headline: {
    textDecoration: "underline",
    fontWeight: "bold",
  },
  table: {
    margin: "30px",
  },
  tableHeader: {
    display: "grid",
    gridTemplateColumns: "auto auto auto auto auto",
    textAlign: "left",
  },
  tableColumn: {
    display: "grid",
    gridTemplateColumns: "auto auto auto auto auto",
    textAlign: "left",
  },
  tableCell: {
    textAlign: "left",
    padding: "15px",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    gridGap: "2em",
  },
  textLeft: {
    textAlign: "left",
  },
  textRight: {
    textAlign: "right",
  },
}));
export default function Unterrichtsprotokoll() {
  const classes = useStyles();
  const data = "test";
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <img src={logo} alt="Logo" className={classes.logo} />
      </div>
      <div className={classes.headline}>
        <Typography variant="h2" color="initial">
          <b>Unterrichtsprotokoll</b>
        </Typography>
      </div>
      <div className={classes.infoGrid}>
        <Typography
          variant="inherit"
          color="initial"
          className={classes.textRight}
        >
          Kursnummer: ____{data}____
        </Typography>
        <Typography
          variant="inherit"
          color="initial"
          className={classes.textLeft}
        >
          Dozentin: ____{data}____
        </Typography>
      </div>
      <MyTable
        rows={[
          { name: "test" },
          { name: "test" },
          { name: "test" },
          { name: "test" },
          { name: "test" },
        ]}
      />
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
  ].map((text) => (
    <Typography variant="inherit" color="initial" className={classes.tableCell}>
      {text}
    </Typography>
  ));
  return (
    <div className={classes.table} aria-label="caption table">
      <div className={classes.tableHeader}>{TableHeaderCells}</div>
      {props.rows.map((row) => (
        <div className={classes.tableColumn}>
          <Typography
            variant="inherit"
            color="initial"
            className={classes.tableCell}
          >
            {row.name}
          </Typography>
          <Typography
            variant="inherit"
            color="initial"
            className={classes.tableCell}
          >
            {row.name}
          </Typography>
          <Typography
            variant="inherit"
            color="initial"
            className={classes.tableCell}
          >
            {row.name}
          </Typography>
          <Typography
            variant="inherit"
            color="initial"
            className={classes.tableCell}
          >
            {row.name}
          </Typography>
          <Typography
            variant="inherit"
            color="initial"
            className={classes.tableCell}
          >
            {row.name}
          </Typography>
        </div>
      ))}
    </div>
  );
}
