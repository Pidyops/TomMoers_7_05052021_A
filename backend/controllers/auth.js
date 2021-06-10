const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util')

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


exports.register = (req, res) => {
    console.log(req.body);
    let responseMessage = ''

    const {firstName, lastName, email, password, password2 } = req.body;

    // Check if the email exist in db
    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if(error) {
            console.log('sql error',error)
        }

        if(results.length > 0 ) {
            console.log('email already in use')
            return res.status(403).json({message: 'email already in use'})
            
        } else if(password !== password2) {
            console.log('password do not match')
            return res.status(403).json({message: 'Password not match'})
        }

        // Hash the pw
        let hashedPassword = await bcrypt.hash(password, 8)
        console.log('password hashed', hashedPassword)

        // Insert user in db
        db.query('INSERT INTO users SET ?', {first_name: firstName, last_name: lastName, email: email, password: hashedPassword}, (error, results) => {
            if(error) {
                console.log({error});
            } else {
                responseMessage = 'User registered'
                // return res.status(201).json({message: 'User registered'})
                console.log('register: user saved in db', results)
            }
        })

        // jwt
        db.query('SELECT id, first_name, last_name, email FROM users WHERE email = ?', [email], (error, result) => {
            const token =  jwt.sign({ id: result[0].id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
              });

            const userConnected = result[0]
            console.log(result)

            console.log("The token is sent: " + token);
            res.json({ token, hashedPassword, userConnected, responseMessage })
        });
    });
} 

exports.login = async (req, res) => {
    console.log('login',req.body.password)
    try {
      const { email, password } = req.body;
      console.log(email)
      console.log(password)
  
      if( !email || !password ) {
        console.log('login: Please provide an email and password')
        return res.status(400).json({message: 'Please provide an email and password'})
      }
  
      db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        console.log('82',results);
        if( !results || !(await bcrypt.compare(password, results[0].password)) ) { //if no valid email || password not correct
            console.log('info not matching')
            return res.status(400).json({message: 'Email or Password is incorrect'})

        } else {
            console.log('else')
          const id = results[0].id;

          const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
          });

          const userConnected = {
              id: results[0].id,
              firstName: results[0].first_name,
              lastName: results[0].last_name,
              email: results[0].email
          }

            console.log(userConnected)
  
          console.log("The token is: " + token);
          res.status(400).json({token,  userConnected})
        }
      })
  
    } catch (error) {
      console.log(error);
    }
}

exports.isLoggedIn = async (req, res, next) => {
    // req.message = 'Inside middleware'; // create message variable
    console.log(req.cookies)
    if(req.cookies.jwt) {
        try {
            // 1 verfiy token: decoded = { id: 4, iat: 1622620025, exp: 1630396025 }
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
            console.log('decoded',decoded)

            // 2 check if the user exist
            db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (error, result) => {
                console.log(result);
                if(!result) {
                    return next();

                }

                req.user = result[0];
                return next()
            });

        } catch (error) {
            console.log(error)
            return next()
        }

    } else {
        next();
    }
}

exports.logout = async (req, res) => {
    res.cookie('jwt', 'logout', { //create a cookie (will overwrite the existing one)
        expires: new Date(Date.now() + 2 * 1000),
        htttpOnly: true
    })

    res.status(200).redirect('/');
}

exports.getSingleUser = async (req, res) => {
    console.log('getSingleUser')
    const singleUserId = parseInt(req.params.id)
        console.log(singleUserId)
    try {
        db.query('SELECT first_name, last_name, email FROM users WHERE id = ?', [singleUserId], (error, result) => {
        // console.log(result)
        res.status(200).json(result[0])
        
        });
        
    } catch (error) {
        console.error(error.message)
        res.status(500).json(error.message)
    }

}

exports.patchUser  = async (req, res) => {
    console.log('----- patchUser -----');
    
    console.log('params',req.params)
    console.log('body',req.body)

    const {firstName, lastName, email} = req.body;
    const id = parseInt(req.params.id)
    console.log('id', id)

    try {

        db.query('SELECT email FROM users WHERE email = ? AND id <> ?', [email, id], async (error, results) => {
            if(error) {
                console.log('sql error',error)
            }

            console.log('results', results)
            console.log(results.length)
    
            if(results.length > 0 ) {
                console.log('email already in use')
                return res.status(403).json({message: 'email already in use'})
                
            } else {
                console.log('else')
                const sqlRequest = db.query('UPDATE users SET first_name = ? , last_name = ?, email = ? WHERE id = ?', [firstName, lastName, email, id], (error, result) => {
                    if(error) {
                      console.log(error);
                    } else {
                      console.log(result);
                      console.log(sqlRequest.sql)
                      res.status(201).json('status uploladed')
                    }
                  })
            }
        });

    } catch (error) {
    }

}

exports.deleteUser = async (req, res) => {
    console.log('----- deletePost -----')

    try {
        console.log('deletePost try:')

        const postId = parseInt(req.params.id)
        console.log(postId )

        const sqlRequest = await db.query('DELETE FROM users WHERE id = ?', [postId], (error, result) => {
            // console.log(result)

            console.log(sqlRequest.sql)
            res.status(200).json('The user have been deleted') 
            
        });
        
    } catch (error) {
        console.log('Delete user')
        console.error(error.message)
        res.status(500).json(error.message)
       
    }
}

exports.changePassword = async (req, res) => {
    console.log('----- Change password -----')
    console.log(req.body);
    console.log(req.params)
    var newToken = ''
    var responseMessage=''

    const id = req.params.id
    const {newPassword, newPassword2, currentPassword, email} = req.body;
    console.log(newPassword, newPassword2, currentPassword, email )

    if(newPassword !== newPassword2) {
        console.log('New password do not match')
        return res.status(403).json({message: 'New password do not match'})

    } else {

        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            console.log('82',results);
            if( !results || !(await bcrypt.compare(currentPassword, results[0].password)) ) { //if no valid email || password not correct
                console.log('current password', results[0].password)
                console.log('info not matching')
                return res.status(400).json({message: 'Invalid Password'})
    
            } else {

                // Create and sen Token
                const id = results[0].id;

                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log("The token is: " + token);
                newToken = token
                


                // Hash the pw
                let hashedPassword = await bcrypt.hash(newPassword, 8)
                console.log('New password hashed', hashedPassword)

                // Insert user password in DB
                db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, id], (error, results) => {
                if(error) {
                    console.log({error});
                } else {
                    responseMessage = 'New password saved'

                    console.log(responseMessage)
                    res.status(200).json({newToken, responseMessage })
                    console.log('token sent')
                    
                    // return res.status(201).json({message: 'User registered'})
                    // console.log('register: user saved in db', results)
                }
                })
            }
        })
    }
} 