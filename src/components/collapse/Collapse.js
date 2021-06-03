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
  
  
  // const storage = 
  // props.post.comments

  // console.log(props.post.comments)
  let numberOfComments = 0

  if( props.post.comments != undefined) {
    numberOfComments = props.post.comments.length
  }


  return (
    <Card className={classes.root + " " + 'collapse'}
        elevation={0}
    
    >
      
      <CardActions className='collapse__action'>
        <Like className='collapse__action--like' numberOfLikes={props.numberOfLikes} />

        <div className='collapse__action--comments'>
            <span className="card-item__footer__left--comments--number">{numberOfComments}</span>
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
