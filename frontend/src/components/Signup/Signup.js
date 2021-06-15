import React, { useState, useEffect } from 'react';
import './signup.scss'
import 'react-toastify/dist/ReactToastify.css'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '../utils/button/Button'
import ButtonLarge from '../utils/button/Button';
import { TextField } from '@material-ui/core';
import InputPassword from '../utils/button/InputPassword';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify'
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #fefefe',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal({authValues, handleAuthChange, setAuthValues, text, color, variant}) {
  const history = useHistory();
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [errorMessage, setErrorMessage] = useState('')

  const actionSignUp = e => {
    e.preventDefault();

    fetch('http://localhost:4000/auth/register', {
      method: 'POST',
      headers: {
      'Content-type': 'application/json'
      },
      body: JSON.stringify(authValues)
    })

    .then((res) => {

      return res.json()})

    .then((res) => {


      if(res.token) {

        sessionStorage.setItem('jwt', res.token)
        sessionStorage.setItem('userConnectedId', res.userConnected.id)
      
        setAuthValues({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          password2: ''
        });

        handleClose();
        history.push('/Forum')

      } else {
        console.log(res)
        console.log('register: else (no token)')
        if(res.message){
          setErrorMessage (res.message)
        }
        else {
          setErrorMessage (res)
        }
      }
    })
  }

  useEffect(() => {
    if (errorMessage){
        toast.error(errorMessage, {className:'toast--error'} )
        setErrorMessage('')
    }

  }, [errorMessage])


  const body = (
    <div className={clsx(classes.paper, 'signup' )}>
      
      <h2 id="simple-modal-title">Sign Up</h2>
      <hr className="signup--hr"/>
      <form className="signup__wrapper">
              <TextField
                className={clsx(classes.input, 'form__inputs--input' )}
                label="first-name" variant="outlined" 
                id='first-name' margin='dense'  
                type="text" 
                name="firstName" 
                placeholder="Enter your first name"
                value= {authValues.firstName} 
                onChange={handleAuthChange}
                size="small" 
              />

              <TextField
                className="signup__wrapper--input form__inputs--input"
                label="last-name" variant="outlined" 
                size="small" margin='dense'  
                id='last-name' 
                type="text" 
                name="lastName" 
                placeholder="Enter your last name"
                value= {authValues.lastName}
                onChange={handleAuthChange}
              />

              <TextField
                className="signup__wrapper--input form__inputs--input"
                label="Email" variant="outlined" 
                size="small" margin='dense'  
                id='email' 
                type="email" 
                name="email" 
                placeholder="Enter your email"
                value= {authValues.email}
                onChange={handleAuthChange}
              />

              <InputPassword 
                htmlFor='password2'
                id='password'
                name='password'
                text='Password'
                authValues={authValues.password} 
                handleAuthChange={handleAuthChange}
                autoComplete="off"
                labelWidth={80}
              />

              <InputPassword 
                htmlFor='password2'
                id='password2'
                name='password2'
                text='Confirm password'
                autoComplete="off"
                authValues={authValues.password2} 
                handleAuthChange={handleAuthChange}
                labelWidth={140}   
              />

              <div className="signup__wrapper--btn">
                <ButtonLarge className={classes.signupBtn} color='primary' text='Sign Up' onClick={actionSignUp}/>
              </div>
            
        </form>

    </div>
  );

  return (
    <div>
      <div className="signin__wrapper__right__form--signup">
        <Button variant={variant} color={color}  type="button" onClick={handleOpen} text={text} />
      </div>

      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Signup modal"
      >
        {body}
      </Modal>
    </div>
  );
}
