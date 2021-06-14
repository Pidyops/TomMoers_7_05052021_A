import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import InputPassword from '../utils/button/InputPassword';
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

export default function ChangePassword({ userConnected, anchorClose }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [userEmail, setUserEmail] = useState('')

  let id= sessionStorage.getItem('userConnectedId')

    useEffect(() => {
      const fetchSingleUser = () => fetch('http://localhost:4000/auth//user' , {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'jwt': sessionStorage.getItem('jwt'), "id": sessionStorage.getItem('userConnectedId')},
      })
      .then(singleUser => singleUser.json())
      .then((singleUser) => {
        setUserEmail(singleUser.email)
        
      })

      fetchSingleUser();
    }, [id]);


  const [newPassword , setNewPassword] = useState('')
  const [newPassword2 , setNewPassword2] = useState('')
  const [currentPassword , setCurrentPassword] = useState('')

    // API
    // PATCH user by id ______________________________________________________________
    const handleNewPassword = () => {
      const body = {
          newPassword: newPassword, 
          newPassword2: newPassword2, 
          currentPassword: currentPassword,
          email: userEmail
        };


      console.log(body)

      const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'jwt': sessionStorage.getItem('jwt'), "id": id  },
        body: JSON.stringify(body)
      };
      const patchNewPassword = () => fetch('http://localhost:4000/auth/userPassword', requestOptions)
        .then(res => res.json())
              .then((res) => {
                setNewPassword('')
                setNewPassword2('')
                setCurrentPassword('')
                sessionStorage.setItem('jwt', res.newToken)
                handleClose()
                anchorClose()
              })
    
        patchNewPassword();
    }
        
  return (
    <div>
      <div type="button" onClick={handleOpen}>
        Change Password
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
          <div className={clsx(classes.paper, 'create-post' )}>
          
            <h2 id="simple-modal-title">Change Password</h2>
            <hr className="avatar-modal--hr"/>
            <form action="" className="avatar-modal__form">
                      
                  <InputPassword 
                    className="avatar-modal__form--input" 
                    htmlFor='newPassword'
                    id='newPassword'
                    name='newPassword'
                    text='New Password'
                    authValues={newPassword} 
                    handleAuthChange={(e) => setNewPassword(e.target.value)}
                    labelwidth={80}   
                    autoComplete="new-password"
                  />

                  <InputPassword 
                    className="avatar-modal__form--input" 
                    htmlFor='newPassword2'
                    id='newPassword2'
                    name='newPassword2'
                    text='Confirm new password'
                    authValues={newPassword2} 
                    handleAuthChange={(e) => setNewPassword2(e.target.value)}
                    labelwidth={140}
                    autoComplete="new-password"
                  />

                    <InputPassword 
                    className="avatar-modal__form--input" 
                    htmlFor='currentPassword'
                    id='currentPassword'
                    name='currentPassword'
                    text='Current Password'
                    authValues={currentPassword} 
                    handleAuthChange={(e) => setCurrentPassword(e.target.value)}
                    labelwidth={140}
                    autoComplete="current-password"
                  />
                  
                  <div className="avatar-modal__form--btn">
                    <ButtonLarge color='primary' text='Confirm' onClick={handleNewPassword}/>
                  </div>
                  
            </form>
        </div>
          
        </Fade>
      </Modal>
    </div>
  );
}