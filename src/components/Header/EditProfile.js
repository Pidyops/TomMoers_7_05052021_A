import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { TextField } from '@material-ui/core';
import ButtonLarge from '../utils/button/Button';
import {myHeader} from '../../api/posts'



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

export default function EditProfile({ userConnected }) {
  const classes = useStyles();


  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    fetchSingleUser(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [userFirstName, setUserFirstName] = useState('')
  const [userLastName, setUserLastName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  // const [userImage, setUserImage] = useState('')

  let id= sessionStorage.getItem('userConnectedId')

  const fetchSingleUser = () => fetch('http://localhost:4000/auth//user/' + id, {
    method: 'GET',
    headers: myHeader
  })
  .then(singleUser => singleUser.json())
  // .then(data => console.log('data', data))
  .then((singleUser) => {
    // console.log({singleUser})
    setUserFirstName(singleUser.first_name)
    setUserLastName(singleUser.last_name)
    setUserEmail(singleUser.email)
  //     setUserImage(data.image)
  })

    useEffect(() => {
      fetchSingleUser();
    }, []);


    // console.log(userFirstName)
    // console.log(userLastName)
    // console.log(userEmail)
    // console.log(userImage)
    
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
      // if (userConnected.image !== userImage) {
      //   body.image = userImage
      // }

      console.log({body})

      const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'jwt': sessionStorage.getItem('jwt'), "id": id },
        body: JSON.stringify(body)
        // body: JSON.stringify({firstName : userFirstName})
      };
      const putUserById = () => fetch('http://localhost:4000/auth/userPatch/' + id, requestOptions)
        .then(response => response.json())
        // .then(data => setUserFirstName(data.firstName));
        putUserById(id);
        handleClose();
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
          <div className={classes.paper + ' ' + 'avatar-modal'}>
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
                    className="avatar-modal__form--input" 
                    label="last-name" variant="outlined" 
                    size="small" margin='dense'  
                    id='last-name' 
                    type="text" 
                    name="lastName" 
                    className="form__inputs--input" 
                    placeholder="Enter your new last name"
                    value={userLastName}
                    onChange={(e) => setUserLastName(e.target.value)}
                  />
                      

                  <TextField
                    className="avatar-modal__form--input" 
                    label="Email" variant="outlined" 
                    size="small" margin='dense'  
                    id='email' 
                    type="email" 
                    name="email" 
                    className="form__inputs--input" 
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
