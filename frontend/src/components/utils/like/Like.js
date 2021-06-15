import React, { useEffect, useState } from 'react'
import './like.scss'
import { ThumbDownAltOutlined, ThumbUpAltOutlined } from '@material-ui/icons'

export default function Like(props) {
    const [like, setLike] = useState(props.post.likes_sum)
    const [isLiked, setIsLiked] = useState(props.post.is_liked===1)
    const [isDisliked, setIsDisliked] = useState(props.post.is_liked===-1)

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
    
    // Post like
    useEffect(() => {
        let like2Post = 0

        if(isLiked === true) {
            like2Post = 1
        } else if (isDisliked === true) {
            like2Post = -1
        } else {
            like2Post = 0
        }

        const postLikes = () => {

            let body = {
                userId: sessionStorage.getItem('userConnectedId'),
                postId: props.post.id,
                like: like2Post
            }
        
        
            fetch('http://localhost:4000/feed/likes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'jwt': sessionStorage.getItem('jwt'), "id": sessionStorage.getItem('userConnectedId')},
            body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then((res) => {
            })
        }


        postLikes()
    }, [like, isLiked, isDisliked, props.post.id]);

    return (
        <div className="card-item__footer__left">
            <span onClick={likeHandler} ><ThumbUpAltOutlined 
                className={isLiked ? 'like--active' : ''}
            /></span>
            <span className="card-item__footer__left--likes">{like == null ? 0 : like}</span>
            <span onClick={dislikeHandler} ><ThumbDownAltOutlined className={isDisliked ? 'like--active' : ''} /></span>
        </div>
    )
}
