import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { IconButton } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import './createPostModal.scss';
// import { useHistory } from 'react-router-dom';



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
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  textArea: {
    width: '100%'
  }
}));

export default function CreatePostModal({
  onPostCreated,
  description, setDescription, image, setImage,
  date, userId, like, comment
}) {




  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    // setTitleError(false)
    // setDetailsError(false)

    // if (title == '') {
    //   setTitleError(true)
    // }
    // if (details == '') {
    //   setDetailsError(true)
    // }
    // if (title && details)
    fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ description, image, date, userId, like, comment })
    })
      .then(() => {
        onPostCreated(); //refreshPosts()
        handleClose();
        setDescription('');
      })
  }

  return (
    <div>
      <Button className='create-post--btn'
        type='submit'
        color='primary'
        variant='contained'
        onClick={handleOpen}
      >
        Create a post
      </Button>

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
          <div className={classes.paper + ' ' + "create-post" }>
            <form noValidate autoComplete="off" onSubmit={handleSubmitPost}>
              <h2 id="transition-modal-title">Create your post</h2>
              <hr className="create-post--hr"/>
              <TextareaAutosize
                className={classes.textArea}
                aria-label="empty textarea to write your post"
                rowsMin={4}
                placeholder="Write you post"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div>
                <input
                  accept="image/*" className={classes.input} id="icon-button-file" type="file"
                  value={image} onChange={(e) => setImage(e.target.value)}
                />
                <label htmlFor="icon-button-file">
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                  </IconButton>
                </label>
              </div>
              <Button
                type='submit'
                color='secondary'
                variant='contained'
              >
                Submit
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
