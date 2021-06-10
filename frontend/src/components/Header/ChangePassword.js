import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import InputPassword from '../utils/button/InputPassword';
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

export default function ChangePassword({ userConnected }) {
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

  const fetchSingleUser = (id) => fetch('http://localhost:4000/auth//user/' + id, {
    method: 'GET',
    headers: myHeader,
  })
  .then(singleUser => singleUser.json())
  // .then(data => console.log('data', data))
  .then((singleUser) => {
    // console.log({singleUser})
    setUserEmail(singleUser.email)
  //     setUserImage(data.image)
  })

    useEffect(() => {
      fetchSingleUser(id);
    }, []);


  const [newPassword , setNewPassword] = useState('')
  const [newPassword2 , setNewPassword2] = useState('')
  const [currentPassword , setCurrentPassword] = useState('')
  // let currentToken = sessionStorage.getItem('jwt')

    // console.log(id)
    // console.log(newPassword)
    // console.log(newPassword2)
    // console.log(currentPassword)

    
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
      const patchNewPassword = () => fetch('http://localhost:4000/auth/userPassword/' + id, requestOptions)
        // .then(response => response.json())
        // .then(data => setUserFirstName(data.firstName));
        .then(res => res.json())
            //   .then(res => console.log(res))
              .then((res) => {
                setNewPassword('')
                setNewPassword2('')
                setCurrentPassword('')
                console.log('res', res)
                // console.log(res.newToken)

                
                sessionStorage.setItem('jwt', res.newToken)
                // sessionStorage.setItem('jwt', res.token)
                // console.log(res.responseMessage)

                handleClose()

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
          <div className={classes.paper + ' ' + 'avatar-modal'}>
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
                    labelWidth={80}   
                  />

                  <InputPassword 
                    className="avatar-modal__form--input" 
                    htmlFor='newPassword2'
                    id='newPassword2'
                    name='newPassword2'
                    text='Confirm new password'
                    authValues={newPassword2} 
                    handleAuthChange={(e) => setNewPassword2(e.target.value)}
                    labelWidth={140}   
                  />

                    <InputPassword 
                    className="avatar-modal__form--input" 
                    htmlFor='currentPassword'
                    id='currentPassword'
                    name='currentPassword'
                    text='Current Password'
                    authValues={currentPassword} 
                    handleAuthChange={(e) => setCurrentPassword(e.target.value)}
                    labelWidth={140}   
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






// const requestOptions = {
//   method: 'PATCH',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify(body)
//   // body: JSON.stringify({firstName : userFirstName})
// };
// const putUserById = () => fetch('http://localhost:5000/Accounts/' + id, requestOptions)
//   .then(response => response.json())
//   // .then(data => setUserFirstName(data.firstName));
//   putUserById(id);