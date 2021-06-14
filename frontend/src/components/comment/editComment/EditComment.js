import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
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

export default function EditComment({
   c, refreshPosts, getComments
}) {
  // console.log(image)
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    fetchSingleComment();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [commentDesc, setCommentDesc] = useState('')


  // FETCH
  // GET single Post
    const fetchSingleComment = () => fetch('http://localhost:4000/feed/comment/' + c.id, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'jwt': sessionStorage.getItem('jwt'), "id": sessionStorage.getItem('userConnectedId')}
    })
    .then(singleComment => singleComment.json())
    // .then(data => console.log('data', data))
    .then((singleComment) => {
      console.log({singleComment})
      setCommentDesc(singleComment.description)

    })
    
    // API
    // PATCH user by id ______________________________________________________________

    const savePostInformation = (e) => {
      e.preventDefault();

      let body= {desc: commentDesc}
      console.log('body', body)

      const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'jwt': sessionStorage.getItem('jwt'), "id": sessionStorage.getItem('userConnectedId')},
        body: JSON.stringify(body)
      };
      const putCommentsById = () => fetch('http://localhost:4000/feed/comment/' + c.id, requestOptions)
        .then(res => res.json())
        .then(data => console.log(data))
        .then(()=> {
          handleClose()
          refreshPosts()
          getComments()
        })

        putCommentsById();
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
              <h2 id="transition-modal-title">Edit your comment</h2>
              <hr className="create-post--hr"/>
              <TextareaAutosize
                className={classes.textArea}
                aria-label="empty textarea to write your post"
                rowsMin={4}
                placeholder="Write you post"
                value={commentDesc}
                onChange={(e) => setCommentDesc(e.target.value)}
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








