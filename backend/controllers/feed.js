const mysql = require('mysql');
const fs = require ('fs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.createPost = async (req, res) => {
    console.log('------- Create Post -------')
    const {description, like} = req.body
    userId = req.userId
    let imageUrl = ''

    try {
        console.log('req.file',req.file)

        if(req.file){
            const url = req.protocol + '://' + req.get('host');
            imageUrl = url + '/images/' + req.file.filename
            // console.log('img url',imageUrl)
        }

        const sqlRequest = await db.query('INSERT INTO posts SET ?', {description: description, image: imageUrl, user_id: userId}, (error, results) => {
            if(error) {
              console.log(error);
            } else {
                console.log(sqlRequest.sql)
            //   console.log(results);
              res.status(201).json('post Created')
            }
          })
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json('Post not created')
    }
}

exports.getAllPosts = async (req, res) => {
    console.log('----- getAllPosts -----')
    userId = req.userId
    // console.log('userId: ', userId)
    try {
        const sqlRequest = db.query("SELECT DISTINCT posts.id, posts.user_id, posts.description, users_request.users_concat,  posts.image, (UNIX_TIMESTAMP(posts.date)) AS publish_date, readPostStatus_request.read_status, likes_request.likes_sum, likes_request_id.is_liked, comments_request.comments_count FROM posts LEFT JOIN (SELECT id, CONCAT(first_name, ' ' , last_name) AS users_concat FROM groupomania.users) AS users_request ON posts.user_id = users_request.id LEFT JOIN (SELECT post_id, read_status FROM groupomania.readPostStatus WHERE readPostStatus.user_id = ?) AS readPostStatus_request  ON posts.id = readPostStatus_request.post_id LEFT JOIN (SELECT post_id, COUNT(*) AS comments_count  FROM groupomania.comments GROUP BY post_id) AS comments_request ON posts.id = comments_request.post_id LEFT JOIN (SELECT post_id, SUM(is_liked) AS likes_sum FROM groupomania.likes GROUP BY post_id) AS likes_request ON posts.id = likes_request.post_id LEFT JOIN (SELECT post_id, is_liked FROM groupomania.likes WHERE likes.user_id = ?) AS likes_request_id  ON posts.id = likes_request_id.post_id ORDER BY posts.id DESC;",

        [userId, userId], (error, result) => {
            // console.log(sqlRequest.sql)
            // console.log(result)
            res.status(200).json(result)
        
        });
        
    } catch (error) {
        // console.error(error.message)
        res.status(500).json(error.message)
    }

}

exports.getSinglePost = async (req, res) => {
    console.log('----- getSinglePost -----')
    const singlePostId = parseInt(req.params.id)
        // console.log('singlePostId',singlePostId)
    try {
        db.query('SELECT description, image FROM posts WHERE id = ?', [singlePostId], (error, result) => {
        // console.log(result)
        res.status(200).json(result[0])
        // res.status(200).json('hello')
        
        });
        
    } catch (error) {
        // console.error(error.message)
        res.status(500).json(error.message)
    }

}

exports.modifyPost  = async (req, res) => {
    console.log('----- modifyPost -----');
    userId = req.userId
    
    const id = parseInt(req.params.id)
    const desc = req.body.desc
    console.log({id: id, desc: desc})

    try {

        const sqlRequest1 = await db.query('SELECT user_id FROM posts WHERE user_id = ? AND id = ?', [userId, id], (error, result) => {
            console.log(result[0])
            console.log(sqlRequest1.sql)
            if(result[0]) {
                const sqlRequest = db.query('UPDATE posts SET description = ? WHERE id = ?', [desc, id], (error, result) => {
                    // console.log(sqlRequest.sql)
                    // console.log(result)
                    res.status(200).json('post upadated')
                });

            } else {
                console.log('not allowed')
                res.status(400).json('not allowed')
            }

        });



        
        
    } catch (error) {
        res.status(400).json('error patch') 
        
    }

}

exports.deletePost = async (req, res) => {
    console.log('----- deletePost -----')
    
    try {
        // console.log('deletePost try:')
        const postId = parseInt(req.params.id)
        userId = req.userId
        // console.log(postId )

        const sqlRequest1 = await db.query('SELECT user_id FROM posts WHERE user_id = ? AND id = ?', [userId, postId], (error, result) => {
            if(result[0]) {

                db.query('SELECT image FROM posts WHERE id = ?', [req.params.id], (error, result) => {
                    // console.log(result)
                    // res.status(200).json(result[0])
                    // res.status(200).json('hello')
                    console.log('reslut[0]', result[0] )
        
                    if (result[0].image){
                        const filename = result[0].image.split('/images/')[1];
                        console.log(filename)
                        fs.unlink('images/' + filename, () => {
                            console.log('file deleted')
                        })
                    }
                    
                });
        
                db.query('DELETE FROM posts WHERE id = ?', [postId], (error, result) => {
                    // console.log(result)
                    try {
                        // console.log(sqlRequest.sql)
        
                        // console.log(result)
                        res.status(200).json('The post have been deleted') 
                        
                    } catch (error) {
                        console.log('deletePost sql catch:')
                        console.error(error.message)
                        res.status(500).json(error.message)
                    }
        
                });

            } else {
                console.log('not allowed')
                res.status(400).json('not allowed')
            }
    
        });

        
        
    } catch (error) {
        console.log('deletePost catch:')
        console.error(error.message)
        res.status(500).json(error.message)
        
    }
}

// READ
exports.handleRead = async (req, res) => {
    console.log('------- handle Read -------')
    // console.log(req.body)
    userId = req.userId

    const { postId, isRead} = req.body
    

    try {
        const sqlRequest = await db.query('INSERT INTO readPostStatus SET ?', { user_id: userId, post_id: postId, read_status: isRead }, (error, results) => {
            if(error) {
                console.log(error);
            } else {
                console.log(sqlRequest.sql)
                console.log(results);
                res.status(201).json('status uploladed')
            }
          })
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json('Read not handled')
    }
}

exports.postComments = async (req, res) => {
    console.log('------- Post Comments -------')
    // console.log(req.body)
    userId = req.userId
    const { postId, commentDesc} = req.body


    try {
        const sqlRequest = await db.query('INSERT INTO comments SET ?', { user_id: userId, post_id: postId, description: commentDesc }, (error, results) => {
            if(error) {
                console.log(error);
            } else {
                console.log(sqlRequest.sql)
                console.log(results);
                res.status(201).json('status uploladed')
            }
          })
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json('Read not handled')
    }
}

exports.getComments = async (req, res) => {
    console.log('------- Get Comments -------')
    // console.log(req.params.id)
    const id = parseInt(req.params.id)


    try {
        const sqlRequest = await db.query("SELECT comments.id, (UNIX_TIMESTAMP(comments.publish_date)) AS publish_date, comments.description, comments.user_id, users_request.comment_author FROM comments LEFT JOIN (SELECT id, CONCAT(first_name, ' ' , last_name) AS comment_author FROM users) as users_request ON comments.user_id = users_request.id WHERE post_id = ? ORDER BY comments.id DESC", [id], (error, result) => {
            if(!result['']) {
                console.log(sqlRequest.sql)
                console.log(result)
                res.status(200).json(result)
            } else {
                console.log('no comments')
                res.status(200).json('there is not comment')
            }
        
        
        });
        
    } catch (error) {
        console.error(error.message)
        res.status(500).json(error.message)
    }
}

// Likes
exports.postLikes = async (req, res) => {
    console.log('------- Post Likes -------')
    console.log(req.body)
    const { postId, like} = req.body
    userId = req.userId

    try {
        //  check if exist
        // console.log('------- Check if exist')
        db.query('SELECT * FROM likes WHERE user_id = ? AND post_id = ?', [userId, postId], async (error, results) => {
            if(error) {
                console.log('sql error',error)
            }
            // console.log('results', results)
            // console.log('results.length', results.length)
        
            // Create in base
            if(results.length === 0 ) {
                console.log('------- Create in BDD')
                const sqlRequest = await db.query('INSERT INTO likes SET ?', { user_id: userId, post_id: postId, is_liked: like}, (error, results) => {
                    if(error) {
                        console.log(error);
                    } else {
                        // console.log(sqlRequest.sql)
                        // console.log(results);
                        res.status(201).json('Like uploladed')
                    }
                  })
                
            // Update in base
            } else if (results.length > 0 ) {

                // console.log('------- Update in BDD')
                const sqlRequest = db.query('UPDATE likes SET is_liked = ?  WHERE post_id = ? AND user_id = ?', [like, postId, userId], (error, result) => {
                    if(error) {
                      console.log(error);
                    } else {
                    //   console.log(result);
                    //   console.log(sqlRequest.sql)
                      res.status(201).json('status uploladed')
                    }
                  })
            }
        });

    } catch (error) {
        console.log(error.message)
        res.status(500).json('Like not handled')
    }
}
