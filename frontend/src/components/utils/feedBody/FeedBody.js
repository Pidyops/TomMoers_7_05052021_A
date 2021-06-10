import './feedBody.scss'

import React from 'react'

export default function FeedBody({src, desc}) {

    return (
        <div className="feed-body">
            <div className="feed-body--desc">{desc}</div>
            <img src={src} alt="" className="feed-body--media"/>
            
        </div>

    )
}
