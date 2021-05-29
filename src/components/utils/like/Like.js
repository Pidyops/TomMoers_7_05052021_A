import { ThumbDownAltOutlined, ThumbUpAltOutlined } from '@material-ui/icons'
import './like.scss'

import React, { useState } from 'react'

export default function Like(props) {
    const [like, setLike] = useState(props.numberOfLikes)

    const [isLiked, setIsLiked] = useState(false)
    const [isDisliked, setIsDisliked] = useState(false)

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

    return (


        <div className="card-item__footer__left">
            <span onClick={likeHandler} ><ThumbUpAltOutlined 
                className={isLiked ? 'like-active' : ''}
            /></span>
            <span className="card-item__footer__left--likes">{ like }</span>
            <span onClick={dislikeHandler} ><ThumbDownAltOutlined className={isDisliked ? 'like-active' : ''} /></span>
        </div>
            
            

    )
}
