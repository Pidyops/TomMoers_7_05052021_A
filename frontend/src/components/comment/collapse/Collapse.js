import React, { useState } from 'react';
import './collapse.scss'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Like from '../../utils/like/Like'
import Comment from '../comment/Comment'

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);
  const [comments, setComments] = useState ('')

  const getComments = () => {
    fetch('http://localhost:4000/feed/comments/' + props.post.id, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'jwt': sessionStorage.getItem('jwt'), "id": sessionStorage.getItem('userConnectedId')},
    })
        .then(res => res.json())
        .then((res) => {
            setComments(res)
            // console.log(res)
            console.log(res)
        })
    }

  const handleExpandClick = () => {
    setExpanded(!expanded);
    getComments()
  };

  let numberOfComments = 0

  if( props.post.comments_count) {
    numberOfComments = props.post.comments_count
  }

  return (
    <Card className={clsx(classes.root, 'collapse')}
        elevation={0}
    >
      
      <CardActions className='collapse__action'>
        <Like className='collapse__action--like' numberOfLikes={props.numberOfLikes} post={props.post} />

        <div className='collapse__action--comments'>
            <span className="card-item__footer__left--comments--number">{numberOfComments}</span>
            
            <span className="card-item__footer__left--comments--comments">{numberOfComments <= 1? ' Comment' : ' comments'}</span>  
            <IconButton
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                <ExpandMoreIcon />
            </IconButton>
        </div>
        
        </CardActions>

      <Collapse 
        in={expanded} timeout="auto" unmountOnExit>
        <Comment 
            userConnected={props.userConnected}
            post={props.post}
            refreshPosts={props.refreshPosts}
            getComments={getComments}
            comments={comments}
            // setComments={props.setComments}
        />
      </Collapse>
    </Card>
  );
}
