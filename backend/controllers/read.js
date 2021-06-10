const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.handleRead = async (req, res) => {
    console.log('------- handle Read -------')
    console.log(req.body)

    try {


        // db.query('INSERT INTO posts SET ?', {description: description, image: image, user_id: userId, likes: like }, (error, results) => {
        //     if(error) {
        //       console.log(error);
        //     } else {
        //       console.log(results);
        //       res.status(201).json('status changed to seen')
        //     }
        //   })
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json('Read not handled')
    }
}

