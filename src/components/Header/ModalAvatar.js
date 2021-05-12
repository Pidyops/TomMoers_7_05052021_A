import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ImageAvatars from './Avatar';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsAvatarModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        <ImageAvatars alt="Remy Sharp" src='static/images/avatar/1.jpg' />
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <h2 id="simple-modal-title">My Account</h2>
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
                        // value= {authValues.firstName}
                        // onChange={handleAuthChange}
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
                        // value= {authValues.lastName}
                        // onChange={handleAuthChange}
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
                        // value= {authValues.email}
                        // onChange={handleAuthChange}
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
                        // value= {authValues.password}
                        // onChange={handleAuthChange}
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
                        // value= {authValues.password2}
                        // onChange={handleAuthChange}
                    />
                </div>
                
                {/* <Button className="auth__signup-btn" color='blue' text='Sign Up' onClick={actionSignUp}/> */}
                
            </form>
            
            
        </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
