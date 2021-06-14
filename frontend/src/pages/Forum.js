import { Container } from '@material-ui/core'
import { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import PostCard from '../components/Forum/postCard/PostCard'

export const Forum = ({ authValues, setAuthValues, userConnected }) => {

    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [date, setDate] = useState('')
    const userConnectedId = sessionStorage.getItem("userConnectedId");
    const userJwt= sessionStorage.getItem("jwt");
    const [userId] = useState(userConnectedId) 
    const [posts, setPosts] = useState('')


    console.log('userConnectedId: ', userConnectedId)
    const refreshPosts = () => fetch('http://localhost:4000/feed/posts', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'jwt': sessionStorage.getItem('jwt'), "id": sessionStorage.getItem('userConnectedId')}
    })
        .then(res => res.json())
        .then((res) => {
            setPosts(res)
            console.log('posts', res)
        })

    useEffect(() => {
        refreshPosts();
    }, [userConnectedId, userJwt]);


    // DELETE post ______________________________________________________
    const handleDeletePost = async (id) => {

        try {
            await fetch('http://localhost:4000/feed/postDelete/' + id, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'jwt': sessionStorage.getItem('jwt'), "id": sessionStorage.getItem('userConnectedId')}
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
                            userConnected={userConnected}
                            refreshPosts={refreshPosts}

                    /></div>
                ))}
            </div>
        </Container>
    )
}

export default Forum