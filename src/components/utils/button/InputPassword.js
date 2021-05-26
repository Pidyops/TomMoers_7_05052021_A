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
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   margin: {
//     margin: theme.spacing(1),
//   },
//   withoutLabel: {
//     marginTop: theme.spacing(3),
//   },
//   textField: {
//     width: '25ch',
//   },
}));

export default function InputPassword({authValues, handleAuthChange, 
    id, name, labelWidth, text, htmlFor, className, ...restProps}) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  // console.log(authValues)
  // console.log(authValues.password2)

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

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
            className={clsx(classes.margin, classes.textField, className)} 
            variant="outlined" {...restProps} fullWidth={true}
            margin='dense'
        >
          <InputLabel htmlFor={htmlFor}>{text}</InputLabel>
          <OutlinedInput
            
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
            labelWidth={labelWidth}
          />
        </FormControl>

      </div>
    </div>
  );
}














// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';

// const useStyles = makeStyles((theme) => ({
//   root: {

//   },
// }));

// export default function TextFieldsOutlined({
//     label, id, type, name, placeholder, 
//     authValues, handleAuthChange
// }) {
//   const classes = useStyles();
//   console.log(authValues)

//   return (
//     <TextField 
//         variant="outlined" size='small'
        
//         label={label} id={id} 
//         type={type} name={name}
//         placeholder={placeholder}
//         value={authValues.firstName} 
//         onChange={handleAuthChange}
//     />
//   );
// }