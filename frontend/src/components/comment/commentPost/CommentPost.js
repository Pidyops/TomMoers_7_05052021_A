import './commentPost.scss'
import React, { useState } from 'react'
import { Button, TextareaAutosize } from '@material-ui/core'
import FeedHeader from '../../utils/feedHeader/FeedHeader'
import FeedBody from '../../utils/feedBody/FeedBody'
import Avatar from '@material-ui/core/Avatar';

export default function CommentPost({ post, refreshPosts, comments, getComments}) {

    const userConnected = sessionStorage.getItem('userConnectedId')
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

    return (
        <div className='comment-post--card'>
            <div className='comment-post'>
                <Avatar></Avatar>
                <div className='comment-post__right'>
                    <TextareaAutosize 
                        className='comment-post__right--comment'
                        fullwidth='fullwidth' aria-label="minimum height" 
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
                {(comments && comments.length > 0) && comments.map(c => (
                    <div key={c.id} className='comment-module'>
                        <FeedHeader c={c} refreshPosts={refreshPosts} getComments={getComments} />
                        <FeedBody desc={c.description} />
                        {/* <FeedInteraction c={c} /> */}
                    </div>
                ))}

            </div>
            
        </div>
    )
}
