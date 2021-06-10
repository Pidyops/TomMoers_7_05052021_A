const express = require('express')
const auth = require('../middleware/auth')
const authControlller = require('../controllers/auth')

const router = express.Router();

router.post('/register', authControlller.register )
router.post('/login', authControlller.login )
router.get('/logout', authControlller.logout)

router.get('/user/:id', auth, authControlller.getSingleUser )
router.patch('/userPatch/:id', auth, authControlller.patchUser )
router.patch('/userPassword/:id', auth, authControlller.changePassword )
router.delete('/userDelete/:id', auth, authControlller.deleteUser )


module.exports = router