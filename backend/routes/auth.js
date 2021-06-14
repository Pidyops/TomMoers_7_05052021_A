const express = require('express')
const auth = require('../middleware/auth')
const infoCheck = require('../middleware/infoCheck')
const authControlller = require('../controllers/auth')

const router = express.Router();

router.post('/register', infoCheck, authControlller.register )
router.post('/login', infoCheck, authControlller.login )

router.get('/user', auth, authControlller.getSingleUser )
router.patch('/userPatch', infoCheck, auth, authControlller.patchUser )
router.patch('/userPassword', infoCheck, auth, authControlller.changePassword )
router.delete('/userDelete', auth, authControlller.deleteUser )


module.exports = router