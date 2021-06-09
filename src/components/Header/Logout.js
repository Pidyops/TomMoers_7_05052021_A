import React from 'react';
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

export default function Logout({ userConnected }) {
  const classes = useStyles();
  const history = useHistory()

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const confirmLogout= () => {
        sessionStorage.setItem('jwt', '')
        sessionStorage.setItem('userConnectedId', '')
        handleClose()
        history.push('/')
    }
        
  return (
    <div>
      <div type="button" onClick={handleOpen}>
        Logout
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
            <h2 id="simple-modal-title">Logout</h2>
            <hr className="avatar-modal--hr"/>
            <form action="" className="avatar-modal__form">
                      
                  
                  <div className="avatar-modal__form--btn">
                    <ButtonLarge color='primary' text='Confirm' onClick={confirmLogout}/>
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