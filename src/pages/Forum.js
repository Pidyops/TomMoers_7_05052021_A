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
    const [userId] = useState(randomTo10) //session storage
    const [like, setLike] = useState(0)
    const [comment, setComment] = useState(0)

    const [posts, setPosts] = useState('')

    const [users, setUsers] = useState('')

    let posty =''
    // API 
    // GET posts ______________________________________________________
    // const refreshPosts = () => getPosts() 
    //     .then(data => setPosts(data)) 

    // const refreshPosts = () => getPostsSQL() 
    // .then(data => setPosts(data)) 

    const refreshPosts = () => fetch('http://localhost:4000/feed/posts')
    .then(res => res.json())
    // .then(data => console.log('data', data))
    .then((res) => {
        // return data
        setPosts(res)
        posty = res
        console.log(res)
    })

    console.log('posts',posts)
    // console.log('posty',posty)

    // const refreshPosts = () => fetch("http://localhost:4000/feed/posts", {
    //     method: "GET",
    //     })
    //     .then(res => res.json())
    //     .then(data => console.log('data', data))
    




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