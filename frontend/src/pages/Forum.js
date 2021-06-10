import { Container } from '@material-ui/core'
import { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import PostCard from '../components/Forum/PostCard'
import {myHeader} from '../api/posts'

export const Forum = ({ authValues, setAuthValues, userConnected }) => {

    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')

    const [date, setDate] = useState('') //session storage

    const userConnectedId = sessionStorage.getItem("userConnectedId");
    const [userId] = useState(userConnectedId) //session storage
    // const [like, setLike] = useState(0)
    const [comment, setComment] = useState(0)

    const [posts, setPosts] = useState('')


    console.log('userConnectedId: ', userConnectedId)
    const refreshPosts = () => 
    fetch('http://localhost:4000/feed/posts/' + userConnectedId, {
        method: 'GET',
        headers: myHeader
    })
        .then(res => res.json())
        .then((res) => {
            setPosts(res)
            // console.log(res)
            console.log('posts', res)
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
                headers: myHeader
            })
            .then(res => res.json())
            .then(data => console.log(data))
        } catch (err) {
            console.log(err)
        }
        await refreshPosts()
    }


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