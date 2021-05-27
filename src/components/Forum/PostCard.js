import React, { useState } from 'react'
import Card from '@material-ui/core/Card';
import { Avatar } from '@material-ui/core';
import { DeleteOutlined,
        ThumbDownAltOutlined, ThumbUpAltOutlined
        } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import './card.scss'
import ModalEditPost from './modalEditPost/modalEditPost';
import clsx from 'clsx';
import Like from '../utils/like/Like';




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

const PostCard = ({ post, handleDeletePost, handlePutPost, users, image, setImage,
     
    }) => {


    const classes = useStyles();

    
    // const [like, setLike] = useState(post.like)

    // const [isLiked, setIsLiked] = useState(false)
    // const [isDisliked, setIsDisliked] = useState(false)

    // const likeHandler = () => {
    //     if (isDisliked === true) {
    //         setLike(like+2)
    //         setIsLiked(true)
    //         setIsDisliked(false)
    //     } else {
    //         setLike(isLiked ? like-1 : like+1)
    //         setIsLiked(!isLiked)
    //     }
    // }

    // const dislikeHandler = () => {
    //     if (isLiked === true) {
    //         setLike(like-2)
    //         setIsLiked(false)
    //         setIsDisliked(true)
    //     } else {
    //         setLike(isDisliked ? like+1 : like-1)
    //         setIsDisliked(!isDisliked)
    //     }
        
    // }


    // console.log('+',isLiked)
    // console.log('-',isDisliked)

    


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
                
                <div className="card-item__header__right">
                    <div className="card-item__header__right--edit">
                        {/* <EditOutlined /> */}
                        <ModalEditPost post={post} image={image} setImage={setImage} />
                    </div>
                    <div className="card-item__header__right--delete">
                        <DeleteOutlined onClick={() => handleDeletePost(post.id)} />
                    </div>
                </div>
            </div>

            
            <div className="card-item__body">
                <div className="card-item__body--desc">
                    {post?.description }
                </div>
                <img className='card-item__body--media' src={post.image} alt=""/>
            </div>
                
            
            
             
            
            {/* {isLiked === false ? className='true' : 'false' }  */}

            <div className="card-item__footer">
                <Like post={post.like} />
                {/* <div className="card-item__footer__left">
                    <span onClick={likeHandler} ><ThumbUpAltOutlined 
                        className={isLiked ? 'like-active' : ''}
                    /></span>
                    <span className="card-item__footer__left--likes">{ like }</span>
                    <span onClick={dislikeHandler} ><ThumbDownAltOutlined className={isDisliked ? 'like-active' : ''} /></span>
                </div> */}
                <div className="card-item__footer__right">
                    <span className="card-item__footer__left--comments--number">{ post.comment}</span>
                    <span className="card-item__footer__left--comments--comments"> Comments</span>
                </div>
            </div>

        </Card>
        </div>
    )
}

export default PostCard
