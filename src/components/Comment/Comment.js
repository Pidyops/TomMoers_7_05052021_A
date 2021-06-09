import { Card } from "@material-ui/core";
import "./comment.scss";
import CommentPost from "../utils/commentPost/CommentPost";
import CommentCard from "../utils/commentCard/CommentCard";
import { useEffect, useState } from "react";
const axios = require("axios");

export default function Comment(props) {

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
        </div>
      </Card>
    </div>
  );
}
