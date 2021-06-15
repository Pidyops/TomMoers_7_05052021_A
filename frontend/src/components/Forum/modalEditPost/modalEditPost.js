import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import ImageUploader from "react-images-upload";
import './modalEditPost.scss'

import clsx from 'clsx';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

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
   post, refreshPosts
}) {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    fetchSinglePost(post.id);
  };


  const handleClose = () => {
    setOpen(false);
  };

  const [imageTest, setImageTest] = useState('')

  const onDrop = picture => {
    setImageTest(picture[0]);
  }


  const [postDesc, setPostDesc] = useState('')


  // FETCH
  // GET single Post

    const fetchSinglePost = () => fetch('http://localhost:4000/feed/post/' + post.id, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'jwt': sessionStorage.getItem('jwt'), "id": sessionStorage.getItem('userConnectedId')}
    })
    .then(singlePost => singlePost.json())
    .then((singlePost) => {
      // console.log({singlePost})
      setPostDesc(singlePost.description)
    })

    
    // API
    // PATCH user by id ______________________________________________________________
    const savePostInformation = (e) => {
      e.preventDefault();
      // console.log('save post information')

      // console.log('imageTest: ',imageTest)
      // console.log('postDesc', postDesc)

      const formData = new FormData();
      formData.append("image", imageTest);
      formData.append("description", postDesc);

      const requestOptions = {
        method: 'PATCH',
        headers: { 'jwt': sessionStorage.getItem('jwt'), "id": sessionStorage.getItem('userConnectedId')},
        body: formData
      };
      const putPostById = () => fetch('http://localhost:4000/feed/post/' + post.id, requestOptions)
        .then(res => res.json())
        // .then(data => console.log(data))
        .then(()=> {
          handleClose()
          refreshPosts()
        })

        putPostById(post.id);
        
    }



  return (
    <div>
      <EditOutlinedIcon onClick={handleOpen} />
      
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
              <ImageUploader
                withIcon={true}
                buttonText={'Replace the actual image?'}
                onChange={onDrop}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
                withPreview={true}
              />
              
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













  // FETCH
  // GET single comment
  // const fetchSingleComment = (post) => getPost(post) //res is what we get
  //   .then(data => {

  //     // console.log(data)
  //     // setPostId(post.id)
  //     setPostDesc(data.description)
  //     setPostImage(data.image)

  //   })
  