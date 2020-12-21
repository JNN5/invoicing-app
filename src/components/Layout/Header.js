import { Divider, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: "center",
    backgroundColor: "#14b8b8",
  },
  text: {
    margin: "20px",
    color: "white",
  },
}));

export default function Header() {
  const classes = useStyles();
  return (
    <Grid item xs={12} className={classes.header}>
      <div className={classes.text}>
        <Typography variant="h6">Invoicing App</Typography>
      </div>
      <Divider />
    </Grid>
  );
}
