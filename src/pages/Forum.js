import { Container } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { getPosts, getPost } from '../api/posts'
import { getUsers } from '../api/users'
import Header from '../components/Header/Header'
import PostCard from '../components/Forum/PostCard'
import moment from 'moment';
import Comment from '../components/comment/Comment'
import { BrowserRouter, Route, Switch } from 'react-router-dom'



export const Forum = ({ authValues, setAuthValues, userConnected }) => {
    const randomTo10 = Math.floor(Math.random()*5)
    const time = moment().format('MMMM Do YYYY, h:mm:ss a')
    // const time = 'time'
    
    // console.log(time)

    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')

    const [date, setDate] = useState(time) //session storage
    const [userId] = useState(randomTo10) //session storage
    const [like, setLike] = useState(0)
    const [comment, setComment] = useState(0)

    const [posts, setPosts] = useState('')

    const [users, setUsers] = useState('')

    
    // API 
    // GET posts ______________________________________________________
    const refreshPosts = () => getPosts() //res is what we get
        .then(data => setPosts(data)) // we then receive the data, that we store in the useState (require one function and one import)

    useEffect(() => {
        refreshPosts();
    }, []);

    // DELETE post ______________________________________________________



    const handleDeletePost = async (id) => {

        try {
            await fetch('http://localhost:5000/posts/' + id, {
                method: 'DELETE'
            })
        } catch (err) {

        }
        await refreshPosts()
    }



    // API 
    // users ______________________________________________________
    const refreshUsers = () => getUsers() //res is what we get
    .then(data => setUsers(data)) // we then receive the data, that we store in the useState (require one function and one import)

    useEffect(() => {
        refreshUsers();
    }, []);

    return (
        <Container>
            <Header
                description={description} setDescription={setDescription}
                image={image} setImage={setImage}
                authValues={authValues}
                setAuthValues={setAuthValues}
                onPostCreated={refreshPosts}
                date={date}
                setDate={setDate}
                userId={userId}
                like={like}
                comment={comment}
                userConnected={userConnected}
            />

            <div>
                {(posts && posts.length > 0) && posts.map(post => (
                    <div key={post.id}>
                        <PostCard 
                            post={post} 
                            handleDeletePost={handleDeletePost} 
                            image={image} setImage={setImage}
                            date={date}
                            users={users}
                            userConnected={userConnected}
                            // date={date} setDate={setDate}
                            // userId={userId}
                            // like={like}
                            // comment={comment}
                            refreshPosts={refreshPosts}
                    /></div>
                ))}




            </div>

            
        </Container>
    )
}


export default Forum