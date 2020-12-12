import { Divider, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: "center",
  },
  text: {
    margin: "20px",
  },
}));

export default function Header() {
  const classes = useStyles();
  return (
    <Grid item xs={12} className={classes.header}>
      <div className={classes.text}>Invoicing App</div>
      <Divider />
    </Grid>
  );
}
