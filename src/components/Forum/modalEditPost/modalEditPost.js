import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { EditOutlined, PhotoCamera } from '@material-ui/icons';
// import { useHistory } from 'react-router-dom';
import './modalEditPost.scss'
import UploadImage from '../../utils/UploadImage/UpladImage'
import { IconButton } from '@material-ui/core';
import { getPost } from '../../../api/posts';



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



export default function ModalEditPost({
  onPostCreated, post, setPost, title, setTitle, 
  description, setDescription, image, setImage,
  date, setDate, userId, like, comment,
  
}) {
  // console.log(image)
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    fetchSingleComment(postId)
  };

  const handleClose = () => {
    setOpen(false);
  };

  // console.log(post)



  const [postId, setPostId] = useState(3)

  const [postDesc, setPostDesc] = useState('')
  const [postImage, setPostImage] = useState('')


  // const postId= 3
  // const getPostId = () => { 
  //   console.log("hey")
  //   setPostId(post.id)
    //or
    // const postId = post.id
    // console.log(postId)
    
  // }
  // console.log(postId)

  // FETCH
  // GET single comment
  const fetchSingleComment = (postId) => getPost(postId) //res is what we get
    .then(data => {

      // console.log(data)
      setPostId(post.id)
      setPostDesc(data.description)
      setPostImage(data.image)

    })

    useEffect(() => {
      fetchSingleComment(postId);
    }, []);

    // console.log(postDesc)
    // console.log(postImage)

    // console.log(userFirstName)
    // console.log(userLastName)
    // console.log(userEmail)
    // console.log(userImage)
    
    // API
    // PATCH user by id ______________________________________________________________

    const savePostInformation = () => {
      const body = {};
      if (post.description !== postDesc) {
        body.description = postDesc
      }


      const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
        // body: JSON.stringify({firstName : userFirstName})
      };
      const putPostById = () => fetch('http://localhost:5000/posts/' + postId, requestOptions)
        .then(response => response.json())
        // .then(data => setUserFirstName(data.firstName));
        putPostById(postId);
    }



  return (
    <div>
      <button type="button" onClick={handleOpen}  >
        <EditOutlined />
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
          <div className={classes.paper + ' ' + "create-post" }>
            <form noValidate autoComplete="off">
              <h2 id="transition-modal-title">Edit your post</h2>
              <hr className="create-post--hr"/>
              <TextareaAutosize
                className={classes.textArea}
                aria-label="empty textarea to write your post"
                rowsMin={4}
                placeholder="Write you post"
                value={postDesc}
                onChange={(e) => setPostDesc(e.target.value)}
              />
              {/* <UploadImage post={post} setPost={setPost} image={image} setImage={setImage} /> */}
              <div>
                <input
                  accept="image/*" className={classes.input} id="icon-button-file" type="file"
                  value={image} onChange={(e) => setPostImage(e.target.value)}
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
                onClick={savePostInformation}
              >
                Save change
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
