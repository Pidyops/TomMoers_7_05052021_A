import './feedHeader.scss'
import { DeleteOutlined } from '@material-ui/icons'
import moment from 'moment';
import EditComment from '../../comment/editComment/EditComment';
import Avatar from '@material-ui/core/Avatar';

export default function HeaderFeed({ c, refreshPosts, getComments}) {
    const userConnected = sessionStorage.getItem('userConnectedId')
    const userConnectedInt = parseInt(userConnected)

    const dateSQL = c.publish_date
    const timeFromNow = moment.unix(dateSQL).fromNow();


    // DELETE post ______________________________________________________
    const handleDeleteComment = async () => {

        try {
            await fetch('http://localhost:4000/feed/commentDelete/' + c.id, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'jwt': sessionStorage.getItem('jwt'), "id": sessionStorage.getItem('userConnectedId')}
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .then(() => {
                refreshPosts()
                getComments()
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="header-feed">
        <div className="header-feed__left">
            <Avatar></Avatar>
            <div className="header-feed__center">
                <div className="header-feed__center--name">{c.comment_author}
                </div>
                <div className="header-feed__center--date">{timeFromNow}</div>
            </div>
        </div>

        
        {userConnectedInt === c.user_id &&    
            <div className="header-feed__right">
                <div className="header-feed__right--edit">
                    <EditComment c={c} refreshPosts={refreshPosts} getComments={getComments} />
                </div>
                <div className="header-feed__right--delete">
                    <DeleteOutlined onClick={handleDeleteComment} />
                </div>
            </div>
        }

    </div>
    )
}
