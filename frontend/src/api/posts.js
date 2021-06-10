export const getPosts = () => fetch('http://localhost:5000/posts') // GET
    .then(res => res.json())

export const getPost = (postId) => fetch('http://localhost:5000/posts/' + postId,) // GET
.then(res => res.json())

export const getPostsSQL = () => fetch('http://localhost:4000/feed/get') // GET
    .then(res => res.json())


export const myHeader = new Headers({})
    myHeader.append("jwt", sessionStorage.jwt)
    myHeader.append("id", sessionStorage.userConnectedId)


 // import {myHeader} from '../../../api/posts'


//  const res = await fetch("http://localhost:4000/feed/post",{
//     method: 'POST',
//     headers: myHeader,
//     body: formData
//   }).then(res => res.json())
//   // alert(JSON.stringify(res))

//   .then((res) => {
//     console.log(res)
//     onPostCreated(); //refreshPosts()
//     handleClose();
//     setDescription('');
//     setImageTest('')
//   })