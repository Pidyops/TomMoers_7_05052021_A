import Like from '../like/Like'
import './feedInteraction.scss'

export default function FeedInteraction({like, comment}) {

    return (
        <div className="feed-interaction">
            <Like numberOfLikes={like} />
            <div className="feed-interaction__right">
                <span className="feed-interaction__right--number">{comment} </span>
                <span className="feed-interaction__right--comments"> Comments</span>
            </div>
        </div>
    )
}
