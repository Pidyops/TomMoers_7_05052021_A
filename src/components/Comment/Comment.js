import { Card } from "@material-ui/core";
import "./comment.scss";
import CommentPost from "../utils/commentPost/CommentPost";
import CommentCard from "../utils/commentCard/CommentCard";
import { useEffect, useState } from "react";
const axios = require("axios");

export default function Comment(props) {


console.log(props.post.id)


    const [comments, setComments] = useState ('')


    const getComments = () => {
    fetch('http://localhost:4000/feed/comments/' + props.post.id, {
        method: 'GET'
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

    // comments.map(comment => (
    //     <div key={comment.id}>
            
    //     </div>
  

    // console.log(singlePost.comments)
    // singlePost.comments.map(comment => (
    //     <div> comment</div>
    // ))

    // console.log(singlePost.comments)



  // console.log(post)

  return (
    <div className="comment">
      <Card className="comment-card">
        {/* <div className="comment-card__post">
            <FeedHeader date={post.date} />
            <FeedBody desc={post.description} src={post.image} />
            <FeedInteraction like={post.like} comment={post.comment} />
        </div> */}

        <hr className="comment-card--hr" />

        <div className="comment-cart__comment">
          <CommentPost
            userConnected={props.userConnected}
            post={props.post}
            // commentDesc={commentDesc}
            refreshPosts={props.refreshPosts}
            // setCommentDesc={setCommentDesc}
          />
          <CommentCard />
        </div>
      </Card>
    </div>
  );
}




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