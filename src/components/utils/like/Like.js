import { ThumbDownAltOutlined, ThumbUpAltOutlined } from '@material-ui/icons'
import './like.scss'
import React, { useEffect, useState } from 'react'
import {myHeader} from '../../../api/posts'

export default function Like(props) {
    const [like, setLike] = useState(props.post.likes_sum)
    let userIsLiked = props.post.is_liked
    // console.log(userIsLiked)

    let userId = sessionStorage.getItem('userConnectedId')

    const [isLiked, setIsLiked] = useState(false)
    const [isDisliked, setIsDisliked] = useState(false)

    const uploadUserLike = () => {
        if (userIsLiked  === 1) {
            setIsLiked(true)
        } else if(userIsLiked === -1) {
            setIsDisliked(true)
        } else {
            // console.log('the like is neutrale')
        }
    }
    useEffect(() => {
        uploadUserLike()
    }, [userIsLiked]);

    // console.log(isLiked, isDisliked)

    const likeHandler = () => {
        if (isDisliked === true) {
            setLike(like+2)
            setIsLiked(true)
            setIsDisliked(false)

        } else {
            setLike(isLiked ? like-1 : like+1)
            setIsLiked(!isLiked)

        }
    }

    const dislikeHandler = () => {
        if (isLiked === true) {
            setLike(like-2)
            setIsLiked(false)
            setIsDisliked(true)

        } else {
            setLike(isDisliked ? like+1 : like-1)
            setIsDisliked(!isDisliked)

        }
        
    }
    const postLikes = () => {

        let body = {
            userId: userId,
            postId: props.post.id,
            like: like
        }
    
        // console.log(body)
    
        fetch('http://localhost:4000/feed/likes', {
        method: 'POST',
        headers: myHeader,
        body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then((res) => {
            // console.log(res)
        //   onPostCreated(); //refreshPosts()
        })
    
    }
    
    useEffect(() => {
        postLikes()
    }, [like]);

    return (
        <div className="card-item__footer__left">
            <span onClick={likeHandler} ><ThumbUpAltOutlined 
                className={isLiked ? 'like--active' : ''}
            /></span>
            <span className="card-item__footer__left--likes">{like}</span>
            <span onClick={dislikeHandler} ><ThumbDownAltOutlined className={isDisliked ? 'like--active' : ''} /></span>
        </div>
            
            

    )
}
