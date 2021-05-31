import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Like from '../utils/like/Like';
import './collapse.scss'
import Comment from '../comment/Comment';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    // justifyContent: "space-between",

  },
//   media: {
//     height: 0,
//     paddingTop: '56.25%', // 16:9
//   },
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
//   avatar: {
//     backgroundColor: red[500],
//   },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  
  const storage = 
  props.post.comments

  // [
  //   { data: '1', status: '0' },
  //   { data: '2', status: '0' },
  //   { data: '3', status: '0' },
  //   { data: '4', status: '0' },
  //   { data: '5', status: '0' },
  //   { data: '6', status: '0' },
  //   { data: '7', status: '1' },
  // ];
    console.log(storage)
  
  
  // let counter = 0;
  // for (let i = 0; i < storage.length; i++) {
  //   if (storage[i].status === '0') counter++;
  // }
  
  // console.log(counter); // 6


  return (
    <Card className={classes.root + " " + 'collapse'}
        elevation={0}
    
    >
      
      <CardActions className='collapse__action'>
        <Like className='collapse__action--like' numberOfLikes={props.numberOfLikes} />

        <div className='collapse__action--comments'>
            <span className="card-item__footer__left--comments--number">{ props.numberOfPosts}</span>
            <span className="card-item__footer__left--comments--comments"> Comments </span>  
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
        />
      </Collapse>
    </Card>
  );
}
