import { Container } from '@material-ui/core'
import { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import PostCard from '../Forum/PostCard'


export const Forum = ({authValues, setAuthValues}) => {
    const[title, setTitle] = useState('')
    const[description, setDescription] = useState('')
    const[image, setImage] = useState('')

    const[posts, setPosts] = useState('')

    useEffect(() => {
        fetch('http://localhost:5000/posts') // GET
          .then(res => res.json()) //res is what we get
          .then(data => setPosts(data)) // we then receive the data, that we store in the useState (require one function and one import)
    }, [title])

    
    const handleDeletePost = async (id) => {
        await fetch('http://localhost:5000/posts/' + id, {
            method: 'DELETE'
        })

        const newPosts = posts.filter(post => post.id != id)
        setPosts(newPosts)
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


    


    return (
        <Container>
            <Header
                title={title} setTitle={setTitle} 
                description={description} setDescription={setDescription}
                image={image} setImage={setImage}
                authValues={authValues} 
                setAuthValues={setAuthValues} 
            />
            <div>
                {(posts && posts.length > 0) && posts.map(post => (
                    <p key={post.id}><PostCard post={post} handleDeletePost={handleDeletePost}  /></p>
                ))}


            </div>
        </Container>
    )
}


export default Forum