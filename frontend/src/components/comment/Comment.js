import { Card } from "@material-ui/core";
import "./comment.scss";
import CommentPost from "./commentPost/CommentPost"



export default function Comment(props) {

  // const [comments, setComments] = useState ('')

  // const getComments = () => {
  //   fetch('http://localhost:4000/feed/comments/' + props.post.id, {
  //       method: 'GET',
  //       headers: myHeader
  //   })
  //       .then(res => res.json())
  //       .then((res) => {
  //           setComments(res)
  //           // console.log(res)
  //           console.log(res)
  //       })
  //   }

  return (
    <div className="comment">
      <Card className="comment-card">

        <hr className="comment-card--hr" />

        <div className="comment-cart__comment">
          <CommentPost
            userConnected={props.userConnected}
            post={props.post}
            refreshPosts={props.refreshPosts}
            getComments={props.getComments}
            comments={props.comments}
            setComments={props.setComments}
          />
        </div>
      </Card>
    </div>
  );
}
