import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import ImageUploader from "react-images-upload";
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


  const [imageTest, setImageTest] = useState('')

  const onDrop = picture => {
    setImageTest(picture[0]);
  }

  const handleSubmitPost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", imageTest);
    formData.append("description", description);
    formData.append("userId", userId);
      
    fetch("http://localhost:4000/feed/post",{
      method: 'POST',
      headers: { 'jwt': sessionStorage.getItem('jwt'), "id": sessionStorage.getItem('userConnectedId')},
      body: formData
    }).then(res => res.json())

    .then((res) => {
      onPostCreated();
      handleClose();
      setDescription('');
      setImageTest('')
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
          <div className={clsx(classes.paper, "create-post" )}>
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

              <ImageUploader
                withIcon={true}
                buttonText={'upload Image'}
                onChange={onDrop}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
                withPreview={true}
              />

              <div className="create-post--submit">
              <Button
                
                type='submit'
                color='secondary'
                variant='contained'
              >
                Submit
              </Button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}