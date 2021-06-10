// const express = require('express');
// const authController = require('../controllers/auth')

// const router = express.Router();





// router.get('/forum', authController.isLoggedIn, (req, res) => {
//     console.log('isLoggedIn middleware')
//     // console.log(req.message) //var req.message is create in the middleware (authController/isLoggedIn)
//     if(req.user) { //if middleware were successfull
//         res.render('http://localhost:3000/forum', {
//             user: req.user // I create var user
//         }); 
//     } else {
//         res.redirect('http://localhost:3000/')
//     }
//     // res.render('profile');
// });

// module.exports = router;











// router.get('/', authController.isLoggedIn, (req, res) => {
//     res.render('index', {
//         user: req.user
//     });
// });
// router.get('/register', (req, res) => {
//     res.render('register');
// });
// router.get('/login', (req, res) => {
//     res.render('login');
// });