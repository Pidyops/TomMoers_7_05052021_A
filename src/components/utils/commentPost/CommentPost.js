import './commentPost.scss'

import React from 'react'
import { Avatar, Button, TextareaAutosize } from '@material-ui/core'

export default function CommentPost({handleSubmitComment, commentDesc, setCommentDesc}) {
    // console.log(commentDesc)
    // clikou = console.log('clikou')

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
