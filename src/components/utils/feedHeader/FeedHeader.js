import { Avatar } from '@material-ui/core'
import { DeleteOutlined, EditOutlined } from '@material-ui/icons'
import './feedHeader.scss'

export default function HeaderFeed({arial, id, desc, date, c}) {

    console.log(c)
    return (
        <div className="header-feed">

        <div className="header-feed__left">
            <Avatar aria-label={arial} className='header-feed__left'/>
            
            <div className="header-feed__center">
                <div className="header-feed__center--name">{c.authorFirstName} {c.authorLastName}
                </div>
                <div className="header-feed__center--date">{date}</div>
            </div>
        </div>

        

        <div className="header-feed__right">
            <div className="header-feed__right--edit">
                <EditOutlined onClick={() => console.log(id)} />
                {/* <ModalEditPost onClick={() => console.log(id)}  /> */}
            </div>
            <div className="header-feed__right--delete">
                <DeleteOutlined onClick={() => console.log(id)} />
            </div>
        </div>

    </div>
    )
}
