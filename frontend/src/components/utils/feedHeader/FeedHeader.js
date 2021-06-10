import { Avatar } from '@material-ui/core'
import { DeleteOutlined, EditOutlined } from '@material-ui/icons'
import moment from 'moment';
import './feedHeader.scss'

export default function HeaderFeed({arial, id, date, c}) {
    const userConnected = sessionStorage.getItem('userConnectedId')
    const userConnectedInt = parseInt(userConnected)
    // console.log(c.user_id)

    console.log(c)
    const dateSQL = c.publish_date
    console.log(dateSQL)
    const timeFromNow = moment.unix(dateSQL).fromNow();
    console.log(timeFromNow)

    // console.log(c)
    return (
        <div className="header-feed">

        <div className="header-feed__left">
            <Avatar aria-label={arial} className='header-feed__left'/>
            
            <div className="header-feed__center">
                <div className="header-feed__center--name">{c.comment_author}
                </div>
                <div className="header-feed__center--date">{timeFromNow}</div>
            </div>
        </div>

        
        {userConnectedInt === c.user_id &&    
            <div className="header-feed__right">
                <div className="header-feed__right--edit">
                    <EditOutlined onClick={() => console.log(c.user_id)} />
                    {/* <ModalEditPost onClick={() => console.log(id)}  /> */}
                </div>
                <div className="header-feed__right--delete">
                    <DeleteOutlined onClick={() => console.log(id)} />
                </div>
            </div>
        }

    </div>
    )
}
