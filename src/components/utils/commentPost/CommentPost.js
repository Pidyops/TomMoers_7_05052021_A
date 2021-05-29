import './commentPost.scss'

import React, { useState } from 'react'
import { Avatar, Button, TextareaAutosize } from '@material-ui/core'

export default function CommentPost({handleSubmitComment, userConnected, post}) {
    // console.log(userConnected)

    const [singlePost, setSinglePost] = useState (post)
    console.log(singlePost)

    const [commentDesc, setCommentDesc] = useState(
        [
            {
              "comment": "Biodzadup",
              "userId": "Lezdzaae",
              "like": "3edzaza",
            }
          ])
 
    // API 
    // PATCH post ______________________________________________________

    fetch('http://localhost:5000/comments/2', {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ comment: commentDesc })
      })

    return (
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
                        onclick={handleSubmitComment}
                        onclick={ () => console.log('clikou')}
                    > 
                        post
                    </Button>
                </div>

            </div>
        </div>
    )
}
