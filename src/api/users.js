export const getUsers = () => fetch('http://localhost:5000/Accounts') // GET
    .then(res => res.json())