import { useEffect, useState } from 'react';
import './card.scss'
import Card from '@material-ui/core/Card';
import { DeleteOutlined } from '@material-ui/icons';
import ModalEditPost from '../modalEditPost/modalEditPost';
import Collapse from '../../comment/collapse/Collapse';
import moment from 'moment';
import Avatar from '@material-ui/core/Avatar';

const PostCard = ({ post, handleDeletePost, image, setImage, userConnected, refreshPosts }) => {

    const dateSQL = post.publish_date
    const timeFromNow = moment.unix(dateSQL).fromNow();
    const userConnectedId = sessionStorage.getItem("userConnectedId");

    const [isRead, setIsRead] = useState(false)

    const readStatus = () => {
        if (post.read_status ===0 || post.read_status === undefined ) {
            console.log('not read')
        } else if (post.read_status === 1) {
            console.log('to read')
            setIsRead(true)
        } else {
            console.log('status undefined -> not read')
        }
    }

    useEffect(() => {
        readStatus();
    });

    const handleRead = async () => {

        if (isRead === false) {
            setIsRead(true);

            let id = sessionStorage.getItem('userConnectedId')

            let body = {
                    userId: id,
                    postId: post.id,
                    isRead: true
            }

            fetch('http://localhost:4000/feed/read', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'jwt': sessionStorage.getItem('jwt'), "id": id  },
            body: JSON.stringify(body) 
            })

        } else {
            console.log('message already set as seen', isRead)
        }
    }

    return (
        <div className='card' onClick={handleRead}>
        <Card className='card-item' elevation={3}>
            <div className="card-item__header">
                <div className="card-item__header__left">
                    <Avatar></Avatar>
                    <div className="card-item__header__center">
                    <div className="card-item__header__center--name"> {post.users_concat}</div>
                    <div className="card-item__header__center--date">{timeFromNow}</div>
                </div>
                </div>

                <div className='card--read'>
                    {isRead === true? 
                        <div className='card__read'>seen</div>:
                        <div className='card__to-read'>new !</div> }

                    {isRead === true? 
                        <div className='card__read--color'></div> 
                        : <div className='card__to-read--color'></div>}  
                </div>
                
                {parseInt(userConnectedId) === post.user_id ?
                    <div className="card-item__header__right">
                        <div className="card-item__header__right--edit">
                            <ModalEditPost post={post} image={image} setImage={setImage} refreshPosts={refreshPosts} />
                        </div>
                        <div className="card-item__header__right--delete">
                            <DeleteOutlined onClick={() => handleDeletePost(post.id)} />
                        </div>
                    </div>
                    :
                    <div> </div>
                }
            </div>
            
            <div className="card-item__body">
                <div className="card-item__body--desc">
                    {post?.description }
                </div>
                <img className='card-item__body--media' src={post.image} alt=""/>
            </div>
    
            <Collapse 
                numberOfLikes={post.like} 
                numberOfPosts={post.comment}
                userConnected={userConnected}
                post={post}
                refreshPosts={refreshPosts}
            />

        </Card>
        </div>
    )
}

export default PostCard
