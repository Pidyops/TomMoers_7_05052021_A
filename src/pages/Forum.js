import { Container } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { getPosts, getPost, getPostsSQL } from '../api/posts'
import { getUsers } from '../api/users'
import Header from '../components/Header/Header'
import PostCard from '../components/Forum/PostCard'
import moment from 'moment';

export const Forum = ({ authValues, setAuthValues, userConnected }) => {
    const randomTo10 = Math.floor(Math.random()*5)
    const time = moment().format('MMMM Do YYYY, h:mm:ss a')
    // const time = 'time'
    
    // console.log(time)

    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')

    const [date, setDate] = useState(time) //session storage

    const userConnectedId = sessionStorage.getItem("userConnectedId");
    const [userId] = useState(userConnectedId) //session storage
    const [like, setLike] = useState(0)
    const [comment, setComment] = useState(0)

    const [posts, setPosts] = useState('')

    // const [users, setUsers] = useState('')

    // API 
    // GET posts ______________________________________________________
    // const refreshPosts = () => 
    // fetch('http://localhost:4000/feed/posts')
    //     .then(res => res.json())
    //     // .then(data => console.log('data', data))
    //     .then((res) => {
    //         setPosts(res)
    //     })

    // console.log('posts',posts)

    console.log('userConnectedId: ', userConnectedId)
    const refreshPosts = () => 
    fetch('http://localhost:4000/feed/posts/' + userConnectedId, {
        method: 'GET'
    })
        .then(res => res.json())
        .then((res) => {
            setPosts(res)
            // console.log(res)
            console.log(res)
        })


    
    useEffect(() => {
        refreshPosts();
    }, []);

    // DELETE post ______________________________________________________



    const handleDeletePost = async (id) => {

        try {
            // console.log(id)
            await fetch('http://localhost:4000/feed/postDelete/' + id, {
                method: 'DELETE',
            })
            .then(res => res.json())
            .then(data => console.log(data))
        } catch (err) {
            console.log(err)
        }
        await refreshPosts()
    }



    // API 
    // users ______________________________________________________
    // const refreshUsers = () => getUsers() //res is what we get
    // .then(data => setUsers(data)) // we then receive the data, that we store in the useState (require one function and one import)

    // useEffect(() => {
    //     refreshUsers();
    // }, []);


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
                            refreshPosts={refreshPosts}
                            // users={users}
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