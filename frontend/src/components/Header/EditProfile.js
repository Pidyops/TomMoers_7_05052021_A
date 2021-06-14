import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { TextField } from '@material-ui/core';
import ButtonLarge from '../utils/button/Button';
import clsx from 'clsx';

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
    width: 500
  },
}));

export default function EditProfile({ userConnected, anchorClose, onPostCreated }) {
  const classes = useStyles();


  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    fetchSingleUser();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [userFirstName, setUserFirstName] = useState('')
  const [userLastName, setUserLastName] = useState('')
  const [userEmail, setUserEmail] = useState('')

  let id= sessionStorage.getItem('userConnectedId')

  const fetchSingleUser = () => fetch('http://localhost:4000/auth//user' , {
    method: 'GET',
    headers: { 'jwt': sessionStorage.getItem('jwt'), "id": sessionStorage.getItem('userConnectedId')}
  })
  .then(singleUser => singleUser.json())
  .then((singleUser) => {
    setUserFirstName(singleUser.first_name)
    setUserLastName(singleUser.last_name)
    setUserEmail(singleUser.email)
  })
    
    // API
    // PATCH user by id ______________________________________________________________
    const saveUserInformation = () => {
      const body = {};
      if (userConnected.firstName !== userFirstName) {
        body.firstName = userFirstName
      }
      if (userConnected.lastName !== userLastName) {
        body.lastName = userLastName
      }
      if (userConnected.email !== userEmail) {
        body.email = userEmail
      }

      console.log({body})

      const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'jwt': sessionStorage.getItem('jwt'), "id": sessionStorage.getItem('userConnectedId') },
        body: JSON.stringify(body)
      };
      const putUserById = () => fetch('http://localhost:4000/auth/userPatch', requestOptions)
        .then(response => response.json())
        .then(()=> {
          handleClose();
          anchorClose()
          onPostCreated()
        })
        

        putUserById(id);
    }
  
        
  return (
    <div>
      <div type="button" onClick={handleOpen}>
        Edit Profile
      </div>

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
          <div className={clsx(classes.paper, 'avatar-modal')}>
            <h2 id="simple-modal-title">Account information</h2>
            <hr className="avatar-modal--hr"/>
            <form action="" className="avatar-modal__form">
                <TextField
                    label="first-name" variant="outlined" 
                    id='first-name' margin='dense'  
                    type="text" 
                    name="firstName" 
                    className="avatar-modal__form--input" 
                    placeholder="Enter your new first name"
                    value={userFirstName}
                    onChange={(e) => setUserFirstName(e.target.value)}
                    size="small" 
                  />
                      
                
                  <TextField
                    className="avatar-modal__form--input form__inputs--input" 
                    label="last-name" variant="outlined" 
                    size="small" margin='dense'  
                    id='last-name' 
                    type="text" 
                    name="lastName" 
                    placeholder="Enter your new last name"
                    value={userLastName}
                    onChange={(e) => setUserLastName(e.target.value)}
                  />
                      

                  <TextField
                    className="avatar-modal__form--input form__inputs--input" 
                    label="Email" variant="outlined" 
                    size="small" margin='dense'  
                    id='email' 
                    type="email" 
                    name="email" 
                    placeholder="Enter your new email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                  
                  
                  <div className="avatar-modal__form--btn">
                    <ButtonLarge color='primary' text='Save information' onClick={saveUserInformation}/>
                  </div>
                  
            </form>
        </div>
          
        </Fade>
      </Modal>
    </div>
  );
}
