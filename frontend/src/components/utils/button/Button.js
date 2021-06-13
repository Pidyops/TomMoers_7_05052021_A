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


// const Button = ({ color, text, onClick}) => {
//     return (
//         // <div>
//         //     <button onClick={onClick} className="auth__btn" style={{ backgroundColor: color}} type='submit'>{text}</button>
//         // </div>
//         <Button variant="contained" size="large" color="primary" className={classes.margin}>
//         Large
//         </Button>
//     )
// }

Button.defaultProps = {
    color: 'primary',
    variant: 'contained'
}

// Button.propTypes = {
//     text: PropTypes.string,
//     color: PropTypes.string,
//     onClick: PropTypes.func

// }