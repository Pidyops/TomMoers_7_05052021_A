import { ThumbDownAltOutlined, ThumbUpAltOutlined } from '@material-ui/icons'
import './like.scss'
import React, { useEffect, useState } from 'react'

export default function Like(props) {
    const [like, setLike] = useState(props.post.likes_sum)
    
    let userIsLiked = props.post.is_liked
    // console.log(userIsLiked)

    let userId = sessionStorage.getItem('userConnectedId')

    const [isLiked, setIsLiked] = useState(false)
    const [isDisliked, setIsDisliked] = useState(false)

    let like2Post = 0

    
    useEffect(() => {
        const uploadUserLike = () => {
            if (userIsLiked  === 1) {
                setIsLiked(true)
            } else if(userIsLiked === -1) {
                setIsDisliked(true)
            } else {
                // console.log('the like is neutrale')
            }
        }

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

    useEffect(() => {


        if(isLiked === true) {
            console.log('1')
            like2Post = 1
        } else if (isDisliked === true) {
            console.log('2')
            like2Post = -1
        } else {
            console.log('3')
            like2Post = 0
        }
    }, [isLiked, isDisliked])
    
    
    useEffect(() => {
        const postLikes = () => {

            let body = {
                userId: userId,
                postId: props.post.id,
                like: like2Post
            }
        
            console.log(body)
        
            fetch('http://localhost:4000/feed/likes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'jwt': sessionStorage.getItem('jwt'), "id": sessionStorage.getItem('userConnectedId')},
            body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then((res) => {
                // console.log(res)
            //   onPostCreated(); //refreshPosts()
            })
        }


        postLikes()
        

        
    }, [like, props.post.id, userId]);

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
