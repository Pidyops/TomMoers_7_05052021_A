export const getPosts = () => fetch('http://localhost:5000/posts') // GET
    .then(res => res.json())

export const getPost = (id) => fetch('http://localhost:5000/posts/' + id,) // GET
.then(res => res.json())



