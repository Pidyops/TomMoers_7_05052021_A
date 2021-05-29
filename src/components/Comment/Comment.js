import { Card } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import './comment.scss'
import FeedHeader from '../utils/feedHeader/FeedHeader'
import FeedBody from '../utils/feedBody/FeedBody';
import FeedInteraction from '../utils/feedInteraction/FeedInteraction';
import CommentPost from '../utils/commentPost/CommentPost';
import CommentCard from '../utils/commentCard/CommentCard';
import { getPost } from '../../api/posts';
const axios = require('axios');


export default function Comment(props) {
    let id = 3;
    // console.log(props.post)



    // const [post, setPost] = useState('')
    // const [commentDesc, setCommentDesc] = useState('gre')
 
    // // API 
    // // GET post ______________________________________________________
    // const getSinglePost = (id) => getPost(id) //res is what we get
    //   .then(data => setPost(data))
    
    // useEffect(() => {
    //   getSinglePost(id)
    // },[]);

    // fetch('http://localhost:5000/comments/1', {
    //     method: 'PATCH',
    //     headers: { 'content-type': 'application/json' },
    //     body: JSON.stringify({ commentDesc })
    //   })

    // axios.post('http://localhost:5000/posts/4', {
    //     test: 'test'
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    // axios.get('http://localhost:5000/posts/4')
    // .then(function (response) {
    // // handle success
    // console.log(response);
    // })
    // .catch(function (error) {
    // // handle error
    // console.log(error);
    // })
    // .then(function () {
    // // always executed
    // });


    // API 
    // GET post ______________________________________________________
    const handleSubmitComment = (id) => {
        console.log('hi')
        // e.preventDefault(); ???????
        // setTitleError(false)
        // setDetailsError(false)
    
        // if (title == '') {
        //   setTitleError(true)
        // }
        // if (details == '') {
        //   setDetailsError(true)
        // }
        // if (title && details)
        // fetch('http://localhost:5000/posts/' + id, {
        //   method: 'POST',
        //   headers: { 'content-type': 'application/json' },
        //   body: JSON.stringify({ commentDesc })
        // })
        //   .then(() => {
            
        //   })
      }

    
    // console.log(post)
    
    return (
        <div className='comment'>
            <Card className='comment-card'>

                    {/* <div className="comment-card__post">
                       
                        <FeedHeader date={post.date} />

                        <FeedBody desc={post.description} src={post.image} />

                        <FeedInteraction like={post.like} comment={post.comment} />
                    </div> */}
                    
                    <hr className='comment-card--hr'/>
                
                    <div className="comment-cart__comment">
                        <CommentPost 
                            userConnected={props.userConnected}
                            post={props.post}
                            // commentDesc={commentDesc}
                            handleSubmitComment={handleSubmitComment} 
                            // setCommentDesc={setCommentDesc}
                        />
                        <CommentCard />
                    </div>



                    
                
            </Card>
        </div>
    )
}