import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    margin: {

    },

  }));

export default function ButtonLarge({variant, color, text, onClick, fullwidth}) {
    const classes = useStyles();

  return (
        <Button fullwidth={fullwidth} color={color} variant={variant} size="large" onClick={onClick} className={classes.margin}>
          {text}
        </Button>
  );
}

Button.defaultProps = {
    color: 'primary',
    variant: 'contained'
}