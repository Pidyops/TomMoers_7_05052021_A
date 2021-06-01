import './commentPost.scss'
import React, { useState } from 'react'
import { Avatar, Button, TextareaAutosize } from '@material-ui/core'
import moment from 'moment';
import FeedHeader from '../feedHeader/FeedHeader'
import FeedBody from '../feedBody/FeedBody'
// import './commentCard.scss'


export default function CommentPost({ userConnected, post, refreshPosts}) {
    // console.log(userConnected)
    const m = moment().valueOf()

    const [singlePost, setSinglePost] = useState (post)
    // console.log(singlePost)

    const [commentDesc, setCommentDesc] = useState('')




    // API 
    // PATCH post ______________________________________________________

    function sendComment() {
        // e.preventDefault();
        console.log('Le lien a été cliqué.');

        if ( !singlePost.comments ) {
            singlePost.comments = []

        }

        singlePost.comments.push({ 
            commentDesc : commentDesc,
            id : m,
            userId: userConnected.id,
            authorFirstName: userConnected.firstName,
            authorLastName: userConnected.lastName,
            authorImage: userConnected.image
        })
        
        
        fetch('http://localhost:5000/posts/' + post.id, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ comments : singlePost.comments })
        }).then(() => {
            refreshPosts()
            setCommentDesc('')
        })

        
    }

    

    // ---------------
    // GET COMMENTS

    // const [comments, setComments] = useState ('')
    // const getComments = () => getPosts() //res is what we get
    // .then(data => setComments(data)) // we then receive the data, that we store in the useState (require one function and one import)

    // useEffect(() => {
    //     getComments();
    // }, []);

    // console.log(comments)


    // comments.map(comment => (
    //     <div key={comment.id}>
            
    //     </div>
  

    // console.log(singlePost.comments)
    // singlePost.comments.map(comment => (
    //     <div> comment</div>
    // ))

    // console.log(singlePost.comments)

    const theComments = singlePost.comments


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
                            // onclick={ () => console.log('postComment')}
                            // onclick={sendComment}
                            // onclick={handleSubmitComment}
                        > 
                            post
                        </Button>
                    </div>

                </div>
            </div>

            <div>
                {(theComments && theComments.length > 0) && theComments.map(c => (
                    <div key={c.id} className='comment-module'>
                        <FeedHeader c={c} />
                        <FeedBody desc={c.commentDesc} />
                        {/* <FeedInteraction c={c} /> */}
                    </div>
                ))}
            </div>
        </div>
    )
}
