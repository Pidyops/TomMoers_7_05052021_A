import { Container } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { getPosts } from '../api/posts'
import { getUsers } from '../api/users'
import Header from '../components/Header/Header'
import PostCard from '../components/Forum/PostCard'
import moment from 'moment';



export const Forum = ({ authValues, setAuthValues }) => {
    const randomTo10 = Math.floor(Math.random()*5)
    const time = moment().calendar();   
    console.log(time)

    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')

    const [date, setDate] = useState(time) //session storage
    const [userId] = useState(randomTo10) //session storage
    // const [like, setLike] = useState(0)
    const [comment, setComment] = useState(0)

    


    const [posts, setPosts] = useState('')
    const [users, setUsers] = useState('')

    
    // API 
    // posts ______________________________________________________
    const refreshPosts = () => getPosts() //res is what we get
        .then(data => setPosts(data)) // we then receive the data, that we store in the useState (require one function and one import)

    useEffect(() => {
        refreshPosts();
    }, []);


    // API ---data--> React

    const handleDeletePost = async (id) => {

        try {
            await fetch('http://localhost:5000/posts/' + id, {
                method: 'DELETE'
            })
        } catch (err) {

        }
        await refreshPosts()
    }

    // const handlePutPost = () => {
    //     console.log('hello',)
    // }




    // const handlePutPost = async (id) => {
    //     await fetch('http://localhost:5000/posts/' + id, {
    //         method: 'PUT',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ title, description, image })
    //     })
    //     // call the useEffect
    // }


    // API 
    // users ______________________________________________________
    const refreshUsers = () => getUsers() //res is what we get
    .then(data => setUsers(data)) // we then receive the data, that we store in the useState (require one function and one import)

    useEffect(() => {
        refreshUsers();
    }, []);


    // console.log(users)
    // const user = users.filter(p=>p.id ===1)
    // console.log(user[0].email)

    // console.log(users)
    // const user = users.map(u=>u.id !=1)
    // console.log(user)

    // const results = users.filter(function(i){
    //     if(i.id >=2) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // });
    // console.log(results)

    // console.log(date)
    // const xx = users.map(u => 
    //     <p key={u.id}>{u.firstName}</p>)
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
                // like={like}
                comment={comment}
            />
            
            <div>
                {(posts && posts.length > 0) && posts.map(post => (
                    <div key={post.id}><PostCard 
                    post={post} 
                    handleDeletePost={handleDeletePost} 
                    image={image} setImage={setImage}
                    date={date}
                    users={users}
                    // date={date} setDate={setDate}
                    // userId={userId}
                    // like={like}
                    // comment={comment}
                    /></div>
                ))}


            </div>
            
        </Container>
    )
}


export default Forum