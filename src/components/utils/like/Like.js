import { ThumbDownAltOutlined, ThumbUpAltOutlined } from '@material-ui/icons'
import './like.scss'

import React, { useState } from 'react'

export default function Like({post}) {
    const [like, setLike] = useState(post)

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


        <div className="like">
            <span onClick={likeHandler} ><ThumbUpAltOutlined 
                className={isLiked ? 'like--active' : ''}
            /></span>
            <span className="like--number">{ like }</span>
            <span onClick={dislikeHandler} ><ThumbDownAltOutlined className={isDisliked ? 'like--active' : ''} /></span>
        </div>
            
            

    )
}
