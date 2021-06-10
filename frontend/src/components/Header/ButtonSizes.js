import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function ButtonSizes({variant, color, text}) {
  const classes = useStyles();

  // console.log(text)

  return (
    <div>
      <div>
        {/* <Button variant="outlined" size="small" color={color} className={classes.margin}>
          {text}
        </Button> */}
        <Button variant={variant} size="medium" color={color} className={classes.margin}>
          {text}
        </Button>
      </div>
      {/* <div>
        <Button variant="contained" size="small" color="primary" className={classes.margin}>
          Small
        </Button>
        <Button variant="contained" size="medium" color="primary" className={classes.margin}>
          Medium
        </Button>
      </div> */}
    </div>
  );
}
