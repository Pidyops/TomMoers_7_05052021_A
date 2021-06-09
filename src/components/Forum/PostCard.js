import Card from '@material-ui/core/Card';
import { Avatar} from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import './card.scss'
import ModalEditPost from './modalEditPost/modalEditPost';
import Collapse from '../collapse/Collapse';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({

    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
  }));

const PostCard = ({ 
    post, handleDeletePost, image, 
    setImage, userConnected, refreshPosts
    }) => {
    const classes = useStyles();

    // console.log('postCard: userConnected', userConnected)

    const userConnectedId = sessionStorage.getItem("userConnectedId");

    const [isRead, setIsRead] = useState(false)

    const readStatus = () => {
        if (post.read_status ===0 || post.read_status == undefined ) {
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
    }, []);
    // console.log(userConnectedId)
    // console.log(post.user_id)
    const handleRead = async () => {

        if (isRead === false) {
            setIsRead(true);

            let id = sessionStorage.getItem('userConnectedId')

            let body = {
                    userId: id,
                    postId: post.id,
                    isRead: true
            }
            
        
            console.log(body)

            fetch('http://localhost:4000/feed/read', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(body) 
            })
            // .then(() => {
            //   onPostCreated(); //refreshPosts()
            // })

        } else {
            console.log('message already set as seen', isRead)
        }
    }

    console.log(isRead)

    // console.log(userConnectedId)
    // const getReadStatus = () => 
    // fetch('http://localhost:4000/feed/read/' + userConnectedId, {
    //     method: 'GET'
    // })
    //     .then(res => res.json())
    //     .then((res) => {
    //         // console.log(res)
    //     })


    // useEffect(() => {
    //     getReadStatus();
    // }, []);


    // const dateSql = post.date



    return (
        <div className='card' onClick={handleRead}>
        <Card className='card-item' elevation={3}>
            <div className="card-item__header">
                <div className="card-item__header__left">
                    <Avatar aria-label="recipe" className={classes.avatar}/>
                    
                    <div className="card-item__header__center">
                    <div className="card-item__header__center--name"> {post.users_concat}
                        {/* {users.filter(u=>u.id === post.userId)[0].firstName}&nbsp;
                        {users.filter(u=>u.id === post.userId)[0].lastName} */}
                    </div>
                    <div className="card-item__header__center--date">{post.date}</div>
                </div>
                </div>

                <div className='card--read'>
                {isRead === true? 
                    <div className='card__read'>
                         seen
                        
                    </div>
                    
                    :
                    <div className='card__to-read'>
                        new !
                        
                    </div>
                    
                }

                {isRead === true? 
                <div className='card__read--color'></div>

                :
                <div className='card__to-read--color'></div>

                }  

                </div>
                
                {/* {userConnected.id === post.userId && */}
                {userConnectedId == post.user_id &&
                    <div className="card-item__header__right">
                        <div className="card-item__header__right--edit">
                            {/* <EditOutlined /> */}
                            <ModalEditPost post={post} image={image} setImage={setImage} refreshPosts={refreshPosts} />
                        </div>
                        <div className="card-item__header__right--delete">
                            <DeleteOutlined onClick={() => handleDeletePost(post.id)} />
                        </div>
                    </div>
                }
            </div>

            
            <div className="card-item__body">
                <div className="card-item__body--desc">
                    {post?.description }
                </div>
                <img className='card-item__body--media' src={post.image} alt=""/>
            </div>
                
        
            
            {/* {isLiked === false ? className='true' : 'false' }  */}

            {/* <div className="card-item__footer"> */}
                {/* <Like numberOfLikes={post.like} /> */}
                {/* <div className="card-item__footer__left">
                    <span onClick={likeHandler} ><ThumbUpAltOutlined 
                        className={isLiked ? 'like-active' : ''}
                    /></span>
                    <span className="card-item__footer__left--likes">{ like }</span>
                    <span onClick={dislikeHandler} ><ThumbDownAltOutlined className={isDisliked ? 'like-active' : ''} /></span>
                </div> */}
                {/* <div className="card-item__footer__right">
                    <span className="card-item__footer__left--comments--number">{ post.comment}</span>
                    <span className="card-item__footer__left--comments--comments"> Comments </span>
                    
                    
                </div> */}

                
                
            {/* </div> */}
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
