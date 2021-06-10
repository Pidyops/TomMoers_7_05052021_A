import './commentPost.scss'
import React, { useEffect, useState } from 'react'
import { Avatar, Button, TextareaAutosize } from '@material-ui/core'
import moment from 'moment';
import FeedHeader from '../feedHeader/FeedHeader'
import FeedBody from '../feedBody/FeedBody'
// import './commentCard.scss'
import {myHeader} from '../../../api/posts'
import Pagination from '../Pagination/Pagination'


export default function CommentPost({ post, refreshPosts}) {

    const userConnected = sessionStorage.getItem('userConnectedId')

    const [singlePost, setSinglePost] = useState (post)
    const [commentDesc, setCommentDesc] = useState('')

    // API 
    // POST FETCH ______________________________________________________
    function sendComment() {
        // e.preventDefault();

        const body = {
            commentDesc : commentDesc,
            postId: post.id,
            userId: userConnected,
        }
        // console.log(body)
        
        fetch('http://localhost:4000/feed/comments', {
            method: 'POST',
            headers:  { 'Content-Type': 'application/json', 'jwt': sessionStorage.getItem('jwt'), "id": sessionStorage.getItem('userConnectedId') },
            body: JSON.stringify(body)
        }).then(() => {
            // refreshPosts()
            setCommentDesc('')
            refreshPosts()
            getComments()
        })

        
    }

    const [comments, setComments] = useState ('')



    const getComments = () => {
    fetch('http://localhost:4000/feed/comments/' + post.id, {
        method: 'GET',
        headers: myHeader
    })
        .then(res => res.json())
        .then((res) => {
            setComments(res)
            // console.log(res)
            console.log(res)
        })
    }

    useEffect(() => {
        getComments();
    }, []);

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = comments.slice(indexOfFirstPost, indexOfLastPost);

    //Change Page
    const paginate =(pageNumber)=> setCurrentPage(pageNumber)



    return (
        <div>
            <div className='comment-post'>
                
                <div className='comment-post__left'></div>
                    <Avatar />
                <div className='comment-post__right'>
                    <TextareaAutosize 
                        className='comment-post__right--comment'
                        fullWidth='fullWidth' aria-label="minimum height" 
                        rowsMin={3} placeholder="What do you have in mind?" 
                        value={commentDesc}
                        onChange={(e) => setCommentDesc(e.target.value)}
                    />
                    <div className="comment-post__right--submit">
                        <Button variant="contained" color="primary" 
                            onClick={sendComment}
                        > 
                            post
                        </Button>
                    </div>

                </div>
            </div>

                  
                <div>
                {(comments && comments.length > 0) && currentPosts.map(c => (
                    <div key={c.id} className='comment-module'>
                        <FeedHeader c={c} />
                        <FeedBody desc={c.description} />
                        {/* <FeedInteraction c={c} /> */}
                    </div>
                    
                ))}
                {comments.length > postsPerPage &&
                <Pagination postsPerPage={postsPerPage} totalPosts={comments.length} paginate={paginate} />}
                
            </div>
            
        </div>
    )
}
