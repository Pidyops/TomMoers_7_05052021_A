import Card from '@material-ui/core/Card';
import { Avatar} from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import './card.scss'
import ModalEditPost from './modalEditPost/modalEditPost';
import Collapse from '../collapse/Collapse';

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
    avatar: {
        backgroundColor: red[500],
    },
  }));

const PostCard = ({ post, handleDeletePost, handlePutPost, users, image, setImage, userConnected
     
    }) => {
    const classes = useStyles();

    return (
        <div className='card'>
        <Card className='card-item' elevation={3}>
            <div className="card-item__header">
                <div className="card-item__header__left">
                    <Avatar aria-label="recipe" className={classes.avatar}/>
                    
                    <div className="card-item__header__center">
                    <div className="card-item__header__center--name"> Bougou Dji
                        {/* {users.filter(u=>u.id === post.userId)[0].firstName}&nbsp;
                        {users.filter(u=>u.id === post.userId)[0].lastName} */}
                    </div>
                    <div className="card-item__header__center--date">{post.date}</div>
                </div>
                </div>
                
                {userConnected.id === post.userId &&
                    <div className="card-item__header__right">
                        <div className="card-item__header__right--edit">
                            {/* <EditOutlined /> */}
                            <ModalEditPost post={post} image={image} setImage={setImage} />
                        </div>
                        <div className="card-item__header__right--delete">
                            <DeleteOutlined onClick={() => handleDeletePost(post.id)} />
                        </div>
                    </div>
                }
            </div>

            
            <div className="card-item__body">
                <div className="card-item__body--desc">
                    {post?.description }
                </div>
                <img className='card-item__body--media' src={post.image} alt=""/>
            </div>
                
            
            
             
            
            {/* {isLiked === false ? className='true' : 'false' }  */}

            {/* <div className="card-item__footer"> */}
                {/* <Like numberOfLikes={post.like} /> */}
                {/* <div className="card-item__footer__left">
                    <span onClick={likeHandler} ><ThumbUpAltOutlined 
                        className={isLiked ? 'like-active' : ''}
                    /></span>
                    <span className="card-item__footer__left--likes">{ like }</span>
                    <span onClick={dislikeHandler} ><ThumbDownAltOutlined className={isDisliked ? 'like-active' : ''} /></span>
                </div> */}
                {/* <div className="card-item__footer__right">
                    <span className="card-item__footer__left--comments--number">{ post.comment}</span>
                    <span className="card-item__footer__left--comments--comments"> Comments </span>
                    
                    
                </div> */}

                
                
            {/* </div> */}
            <Collapse 
                numberOfLikes={post.like} 
                numberOfPosts={post.comment}
                userConnected={userConnected}
                post={post}
                
            />

            


        </Card>
        </div>
    )
}

export default PostCard
