import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({

}));

export default function InputPassword({authValues, handleAuthChange, 
    id, name, labelWidth, text, htmlFor, className, ...restProps}) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.root}>
      <div>
        <FormControl 
            className={clsx(classes.margin, classes.textField, 'signin__wrapper__right__form--item')} 
            variant="outlined"  fullWidth={true}
            margin='dense'
        >
          <InputLabel htmlFor={htmlFor}>{text}</InputLabel>
          <OutlinedInput
            autoComplete="off"
            
            id={id}
            name={name}
            type={values.showPassword ? 'text' : 'password'}
            value={authValues}
            onChange={handleAuthChange}
            endAdornment={
                <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }

          />
        </FormControl>

      </div>
    </div>
  );
}