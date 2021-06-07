import { ThumbDownAltOutlined, ThumbUpAltOutlined } from '@material-ui/icons'
import './like.scss'

import React, { useEffect, useState } from 'react'

export default function Like(props) {
    const [like, setLike] = useState(0)
    let userId = sessionStorage.getItem('userConnectedId')

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

    // console.log(like)
    // console.log(props.post.id)

    const [likeBoolean, setLikeBoolean] = useState(undefined)

    // if (like === -1) {
    //     setLikeBoolean(false) 
    // } else if (like === 0) {
    //     setLikeBoolean(undefined)
    // } else if (like ===1) {
    //     setLikeBoolean(true)
    // } else {
    //     console.log('like error')
    // }


    // const likeToFetch = () => {
    //     if (like === -1) {
    //         setLikeBoolean(false) 
    //     } else if (like ===1) {
    //         setLikeBoolean(true)
    //     } else {
    //         console.log('like error')
    //     }
    // }

    // useEffect(() => {
    //     likeToFetch()
    // }, []);

    // console.log('like Boolean', likeBoolean)
    



    let body = {
        userId: userId,
        postId: props.post.id,
        like: like
    }

    console.log(body)

    fetch('http://localhost:4000/feed/likes', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then((res) => {
        console.log(res)
    //   onPostCreated(); //refreshPosts()
    })


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
