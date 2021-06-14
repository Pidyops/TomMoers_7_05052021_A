const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const feedControlller = require('../controllers/feed')

router.post('/post', auth, multer, feedControlller.createPost )
router.get('/posts', auth, feedControlller.getAllPosts )
router.get('/post/:id', auth, multer, feedControlller.getSinglePost )
router.patch('/post/:id', auth, multer, feedControlller.modifyPost )
router.delete('/postDelete/:id', auth, feedControlller.deletePost)


router.post('/read', auth, feedControlller.handleRead )
router.post('/likes', auth, feedControlller.postLikes )

router.post('/comments', auth, feedControlller.postComments )
router.get('/comments/:id', auth, feedControlller.getComments)

router.get('/comment/:id', auth, multer, feedControlller.getSingleComment )
router.patch('/comment/:id', auth, multer, feedControlller.modifyComment )
router.delete('/commentDelete/:id', auth, feedControlller.deleteComment)





module.exports = router