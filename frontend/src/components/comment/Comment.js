import { Card } from "@material-ui/core";
import "./comment.scss";
import CommentPost from "../utils/commentPost/CommentPost";

export default function Comment(props) {

  return (
    <div className="comment">
      <Card className="comment-card">

        <hr className="comment-card--hr" />

        <div className="comment-cart__comment">
          <CommentPost
            userConnected={props.userConnected}
            post={props.post}
            refreshPosts={props.refreshPosts}
          />
        </div>
      </Card>
    </div>
  );
}
