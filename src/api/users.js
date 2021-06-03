export const getUsers = () => fetch('http://localhost:5000/Accounts') // GET
    .then(res => res.json())


export const getUser = (id) => fetch('http://localhost:5000/Accounts/' + id,) // GET
    .then(res => res.json())
    
    

    
export const getUsersSql = () => fetch('http://localhost:4000/') // GET
    .then(res => res.json())
    