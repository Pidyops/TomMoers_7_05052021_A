import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ButtonLarge from '../utils/button/Button';
import { useHistory } from 'react-router-dom';

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

export default function DeleteAccount({ userConnected }) {
  const classes = useStyles();
  const history = useHistory()

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let id= sessionStorage.getItem('userConnectedId')

  const deleteUserById = async () => {
    try {
        // console.log(id)
        await fetch('http://localhost:4000/auth/userDelete/' + id, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .then(() => {
          sessionStorage.setItem('jwt', '')
          sessionStorage.setItem('userConnectedId', '')
          handleClose()
          history.push('/')
        })
    } catch (err) {
        console.log(err)
    }
  }
        
  return (
    <div>
      <div type="button" onClick={handleOpen}>
        Delete Account
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
            <h2 id="simple-modal-title">Delete Account</h2>
            <hr className="avatar-modal--hr"/>
            <form action="" className="avatar-modal__form">

            <div>
            Are you sure you want to delete your account?
            </div>
                      
                  
                  <div className="avatar-modal__form--btn">
                    <ButtonLarge variant='outlined' color='error' text='Delete account' onClick={deleteUserById}/>
                  </div>
                  
            </form>
        </div>
          
        </Fade>
      </Modal>
    </div>
  );
}
