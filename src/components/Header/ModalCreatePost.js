import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
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

export default function TransitionsCreatePostModal({post, setPost, title, setTitle, description, setDescription, image, setImage}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // custom

  const history = useHistory()

  // const handlePostChange = e => {
  //   const { name, value } = e.target;
  //   console.log(value)
  //   console.log(name)

  //   // setPost({
  //   //     ...post,
  //   //     // [e.target.name]: e.target.value // the name of the form
  //   //     [name]: value
  //   // });
  // };

  // console.log(post.title)
  // console.log(post.description)

  

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
      headers: {'content-type': 'application/json' },
      body: JSON.stringify({title, description, image})
    })
    .then(() => history.push('/Forum')) //redirect to the home page

    // console.log('Hello')
    // console.log(title, details)
    


    console.log(title)
    console.log(description)
    console.log(description)

    // if (title && details) {
    //   console.log(title, details, category)
    // }
  }



  // console.log(post.description)



  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Create A Post
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
          <div className={classes.paper}>
            <form noValidate autoComplete="off" onSubmit={handleSubmitPost}>
              <h2 id="transition-modal-title">Post your comment</h2>
              <TextField 
                // className={classes.field}
                label='Title'
                variant='outlined'
                color='secondary'
                fullWidth
                required // Add *
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                // error={titleError}
              />
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
              // onClick={() => console.log('you clicked')}
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
