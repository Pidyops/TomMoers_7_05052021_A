import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

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

export default function SimpleModal(actionAuth) {
// export default function SimpleModal(actionAuth, authValues, handleAuthChange, authValues, handleAuthChange, Button, bioup) {
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

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Sign Up</h2>
      <p id="simple-modal-description">
        Join the community
      </p>
      <div className="auth__container-right">
            <form action="" className="auth__form" onSubmit={actionAuth} >
                {/* <div className="auth__inputs">
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

                


                <Button className="auth__signup-btn" color='blue' text='Create New Account' onClick={bioup} />
                 */}
            </form>
            
            
        </div>
      <SimpleModal />
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Create New Account
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
