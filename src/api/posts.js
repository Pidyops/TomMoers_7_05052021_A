export const getPosts = () => fetch('http://localhost:5000/posts') // GET
    .then(res => res.json())

export const getPost = (postId) => fetch('http://localhost:5000/posts/' + postId,) // GET
.then(res => res.json())




