import React, { useEffect, useState } from 'react';
import './avatarModal.scss';
// import { userConnected } from '../../api/GlobalState'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ImageAvatars from '../Header/Avatar';
import { TextField } from '@material-ui/core';
import InputPassword from '../utils/button/InputPassword';
import ButtonLarge from '../utils/button/Button';
import { getUser } from '../../api/users'
import { useHistory } from 'react-router-dom';
// const axios = require('axios');



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

export default function AvatarModal({ userConnected }) {
  const classes = useStyles();
  const history = useHistory()

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [userFirstName, setUserFirstName] = useState('eh')
  const [userLastName, setUserLastName] = useState('e')
  const [userEmail, setUserEmail] = useState('e')
  const [userPassword, setUserPassword] = useState('')
  const [userPassword2, setUserPassword2] = useState('')
  const [userImage, setUserImage] = useState('')

  let id= sessionStorage.getItem('userConnectedId')

  // console.log({id})

  // const fetchSingleUser = (id) => getUser(id) //res is what we get
  //   .then(data =>{

  //     setUserFirstName(data.firstName)
  //     setUserLastName(data.lastName)
  //     setUserEmail(data.email)
  //     setUserImage(data.image)
  //     }) // we then receive the data, that we store in the useState (require one function and one import)
  
  const fetchSingleUser = (id) => fetch('http://localhost:4000/auth//user/' + id, {
    method: 'GET'
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
      fetchSingleUser(id);
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
      if (userConnected.image !== userImage) {
        body.image = userImage
      }

      console.log({body})

      const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
        // body: JSON.stringify({firstName : userFirstName})
      };
      const putUserById = () => fetch('http://localhost:4000/auth/userPatch/' + id, requestOptions)
        .then(response => response.json())
        // .then(data => setUserFirstName(data.firstName));
        putUserById(id);
    }
    
      
    // const deleteUserById = () => 
    //   fetch('http://localhost:4000/userDelete/' + id, { method: 'DELETE' })
    //     .then(() => console.log('Delete successful'))
    //     // .then(() => {
    //     //   setUserFirstName(''),
    //     //   setUserLastName(''),
    //     //   setUserEmail(''),
    //     //   setUserImage(''),
    //     //   setUserPassword(''),
    //     //   setUserPassword2('')
    //     // })
    //     .then(() => 
    //       setUserFirstName(''),
    //       setUserLastName(''),
    //       setUserEmail(''),
    //       setUserImage(''),
    //       setUserPassword(''),
    //       setUserPassword2('')
    //     ).then(() => handleClose()
        // ).then(() => history.push('/'))

        const deleteUserById = async () => {
          // console.log('148',id)
          // console.log('http://localhost:4000/userDelete/' + id)
          try {
              // console.log(id)
              await fetch('http://localhost:4000/auth/userDelete/' + id, {
                  method: 'DELETE',
              })
              .then(res => res.json())
              .then(data => console.log(data))
              .then(() => {
                setUserFirstName('')
                setUserLastName('')
                setUserEmail('')
                sessionStorage.setItem('jwt', '')
                sessionStorage.setItem('userConnectedId', '')
                handleClose()
                history.push('/')
              })
              // .then
          } catch (err) {
              console.log(err)
          }

      }
        
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
                      
                  <InputPassword 
                    className="avatar-modal__form--input" 
                    htmlFor='password2'
                    id='password'
                    name='password'
                    text='Password'
                    
                    authValues={userPassword} 
                    handleAuthChange={(e) => setUserPassword(e.target.value)}
                    labelWidth={80}   
                  />

                  <InputPassword 
                    className="avatar-modal__form--input" 
                    htmlFor='password2'
                    id='password2'
                    name='password2'
                    text='Confirm password'
                    authValues={userPassword2} 
                    handleAuthChange={(e) => setUserPassword2(e.target.value)}
                    labelWidth={140}   
                  />
                  
                  <div className="avatar-modal__form--btn">
                    <ButtonLarge variant='outlined' color='error' text='Delete account' onClick={deleteUserById}/>
                    <ButtonLarge color='primary' text='Save information' onClick={saveUserInformation}/>
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