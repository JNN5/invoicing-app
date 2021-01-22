import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import CreateItem from "./CreateItem";
import CardItem from "./CardItem";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Overview(props) {
  const classes = useStyles();

  return (
    <div className="Overview">
      <div className={classes.root}>
        <h4>{props.header}</h4>
        <CreateItem
          fields={props.dataStructure}
          data={props.data}
          setData={props.setData}
        />
        <Grid container spacing={3}>
          {props.data?.map((item) => {
            if (props.listItem) {
              const ListItem = props.listItem;
              return (
                <ListItem
                  key={item.id || JSON.stringify(item)}
                  item={item}
                  data={props.data}
                  setData={props.setData}
                  dataStructure={props.dataStructure}
                />
              );
            } else {
              return (
                <CardItem
                  key={item.id || JSON.stringify(item)}
                  item={item}
                  data={props.data}
                  setData={props.setData}
                  dataStructure={props.dataStructure}
                />
              );
            }
          })}
        </Grid>
      </div>
    </div>
  );
}

// PropTypes validation
Overview.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
  dataStructure: PropTypes.object.isRequired,
  listItem: PropTypes.func,
};
