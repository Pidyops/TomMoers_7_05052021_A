export const getPosts = () => fetch('http://localhost:5000/posts') // GET
    .then(res => res.json())

export const getPost = (postId) => fetch('http://localhost:5000/posts/' + postId,) // GET
.then(res => res.json())

export const getPostsSQL = () => fetch('http://localhost:4000/feed/get') // GET
    .then(res => res.json())


// API 
// GET posts ______________________________________________________
// const refreshPosts = () => getPosts() 
//     .then(data => setPosts(data)) 