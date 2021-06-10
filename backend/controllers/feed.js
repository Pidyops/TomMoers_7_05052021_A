const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.createPost = async (req, res) => {
    console.log('------- Create Post -------')
    const {description, image, date, userId, like, comments} = req.body
    console.log('req.body', req.body)
    let imageUrl = ''

    try {
        console.log('req.file',req.file)

        if(req.file){
            const url = req.protocol + '://' + req.get('host');
            imageUrl = url + '/images/' + req.file.filename
            console.log('img url',imageUrl)
        }

        const sqlRequest = await db.query('INSERT INTO posts SET ?', {description: description, image: imageUrl, user_id: userId, likes: like }, (error, results) => {
            if(error) {
              console.log(error);
            } else {
                console.log(sqlRequest.sql)
              console.log(results);
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
    let userId = parseInt(req.params.id)
    console.log('userId: ', userId)
    try {
        const sqlRequest = db.query("SELECT DISTINCT posts.id, posts.user_id, posts.description, users_request.users_concat,  posts.image, (UNIX_TIMESTAMP(posts.date)) AS publish_date, readPostStatus_request.read_status, likes_request.likes_sum, likes_request_id.is_liked, comments_request.comments_count FROM posts LEFT JOIN (SELECT id, CONCAT(first_name, ' ' , last_name) AS users_concat FROM groupomania.users) AS users_request ON posts.user_id = users_request.id LEFT JOIN (SELECT post_id, read_status FROM groupomania.readPostStatus WHERE readPostStatus.user_id = ?) AS readPostStatus_request  ON posts.id = readPostStatus_request.post_id LEFT JOIN (SELECT post_id, COUNT(*) AS comments_count  FROM groupomania.comments GROUP BY post_id) AS comments_request ON posts.id = comments_request.post_id LEFT JOIN (SELECT post_id, SUM(is_liked) AS likes_sum FROM groupomania.likes GROUP BY post_id) AS likes_request ON posts.id = likes_request.post_id LEFT JOIN (SELECT post_id, is_liked FROM groupomania.likes WHERE likes.user_id = ?) AS likes_request_id  ON posts.id = likes_request_id.post_id ORDER BY posts.id;",

        [userId, userId], (error, result) => {
            console.log(sqlRequest.sql)
            // console.log(result)
            res.status(200).json(result)
        
        });


        
        // db.query('SELECT id, user_id, description, image, date FROM posts', (error, result) => {
        //     // console.log(result)
        //     res.status(200).json(result)
            
        //     });


        
    } catch (error) {
        // console.error(error.message)
        res.status(500).json(error.message)
    }

}

exports.getSinglePost = async (req, res) => {
    console.log('----- getSinglePost -----')
    const singlePostId = parseInt(req.params.id)
        console.log('singlePostId',singlePostId)
    try {
        db.query('SELECT description, image FROM posts WHERE id = ?', [singlePostId], (error, result) => {
        // console.log(result)
        res.status(200).json(result[0])
        // res.status(200).json('hello')
        
        });
        
    } catch (error) {
        console.error(error.message)
        res.status(500).json(error.message)
    }

}

exports.modifyPost  = async (req, res) => {
    console.log('----- modifyPost -----');
    
    const id = req.params.id
    const desc = req.body.desc
    console.log({id: id, desc: desc})

    try {

        const sqlRequest = db.query('UPDATE posts SET description = ? WHERE id = ?', [desc, id], (error, result) => {
            console.log(sqlRequest.sql)
            console.log(result)
            res.status(200).json('post upadated')
            
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
        // console.log(postId )

        const sqlRequest = await db.query('DELETE FROM posts WHERE id = ?', [postId], (error, result) => {
            // console.log(result)
            try {
                console.log(sqlRequest.sql)

                console.log(result)
                res.status(200).json('The post have been deleted') 
                
            } catch (error) {
                console.log('deletePost sql catch:')
                console.error(error.message)
                res.status(500).json(error.message)
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
    console.log(req.body)

    const {userId, postId, isRead} = req.body
    

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
    console.log(req.body)

    const { postId, userId, commentDesc} = req.body


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
    console.log(req.params.id)
    const id = parseInt(req.params.id)


    try {
        const sqlRequest = await db.query("SELECT comments.id, (UNIX_TIMESTAMP(comments.publish_date)) AS publish_date, comments.description, comments.user_id, users_request.comment_author FROM comments LEFT JOIN (SELECT id, CONCAT(first_name, ' ' , last_name) AS comment_author FROM users) as users_request ON comments.user_id = users_request.id WHERE post_id = ?", [id], (error, result) => {
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
    // console.log('------- Post Likes -------')
    // console.log(req.body)
    const { postId, userId, like} = req.body

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
                        console.log(sqlRequest.sql)
                        console.log(results);
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


// exports.getReadStatus = async (req, res) => {
//     // console.log('------- Get Read Status -------')
//     const userId = req.params.id
//     // console.log('user.id', userId)

//     // try {
//     //     const sqlRequest = await db.query
//     //         ('SELECT readPostStatus.post_id, posts.description, posts.image, readPostStatus.user_id, readPostStatus.read_status FROM posts INNER JOIN readPostStatus ON posts.id = readPostStatus.post_id WHERE readPostStatus.user_id = ? ORDER BY posts.id', 
//     //         [userId], (error, result) => {

//     //         // console.log(sqlRequest.sql)
//     //         // console.log(result)
//     //         res.status(200).json(result)
        
//     //     });
        
//     // } catch (error) {
//     //     console.error(error.message)
//     //     res.status(500).json(error.message)
//     // }
// }




// COMMENTS
