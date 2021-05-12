import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from './Button';


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal({authValues, handleAuthChange, setAuthValues}) {

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  console.log(authValues)

  const actionSignUp = e => {
    e.preventDefault();

    console.log(authValues)


    fetch('http://localhost:5000/accounts', {
      method: 'POST',
      headers: {
      'Content-type': 'application/json'
      },
      body: JSON.stringify(authValues)

    }).then(() => {
      setAuthValues({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: ''
      });
    })
  }

  


  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Sign Up</h2>
      {/* <p id="simple-modal-description">
        Join the community
      </p> */}
      <div className="auth__container-right">
            <form action="" className="auth__form">
                <div className="auth__inputs">
                    <label htmlFor="first-name" className="auth__inputs--label">
                        First Name
                    </label>
                    <input 
                        id='first-name' 
                        type="text" 
                        name="firstName" 
                        className="form__inputs--input" 
                        placeholder="Enter your first name"
                        value= {authValues.firstName}
                        onChange={handleAuthChange}
                    />
                    
                </div>
                <div className="auth__inputs">
                    <label htmlFor="last-name" className="auth__inputs--label">
                        First Name
                    </label>
                    <input 
                        id='last-name' 
                        type="text" 
                        name="lastName" 
                        className="form__inputs--input" 
                        placeholder="Enter your last name"
                        value= {authValues.lastName}
                        onChange={handleAuthChange}
                    />
                    
                </div>
                <div className="auth__inputs">
                    <label htmlFor="email" className="auth__inputs--label">
                        Email
                    </label>
                    <input 
                        id='email' 
                        type="text" 
                        name="email" 
                        className="form__inputs--input" 
                        placeholder="Enter your email"
                        value= {authValues.email}
                        onChange={handleAuthChange}
                    />
                    
                </div>
                <div className="auth__inputs">
                    <label htmlFor="password" className="auth__inputs--label">
                        Password
                    </label>
                    <input 
                        id='password'  
                        type="password" 
                        name="password" 
                        className="auth__inputs--input" 
                        placeholder="Enter your password"
                        value= {authValues.password}
                        onChange={handleAuthChange}
                    />
                </div>
                <div className="auth__inputs">
                    <label htmlFor="password2" className="auth__inputs--label">
                        Password
                    </label>
                    <input 
                        id='password2'  
                        type="password2" 
                        name="password2" 
                        className="auth__inputs--input" 
                        placeholder="Confirm your password"
                        value= {authValues.password2}
                        onChange={handleAuthChange}
                    />
                </div>
                
                <Button className="auth__signup-btn" color='blue' text='Sign Up' onClick={actionSignUp}/>
                
            </form>
            
            
        </div>

    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Sign Up
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        // aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
