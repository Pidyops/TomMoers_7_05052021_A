const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => { // export our middleware
    console.log('------- middleware auth -------')
    // console.log('req.headers: ',req.headers)
    // console.log('req: ',req) no id in request
    console.log('req.headers.jwt: ',req.headers.jwt)
    console.log('req.headers: ',req.headers.id)
    // headersId = parseInt(3)
    headersId = parseInt(req.headers.id)

     try {
        const token = req.headers.jwt; 
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET) 
        const userId = decodedToken.id; 
        console.log('userId (by token): ', userId, typeof userId)
        console.log('req.headers', headersId, typeof headersId)
        if (headersId === userId) { // check if there is a user id and if yes, if it the same extracted from the token
            console.log('token valid')
            next();
        } else {
            console.log('token does not match')
            // throw 'Invalid user ID';
            return res.status(403).json('Invalid Token')

        }
     } catch {
         console.log('catch')
        return res.status(401).json({ status: 401, message: 'Invalid request! (token)'});
     }
};

// Why is my req.body empty when it is not in the feed crtl (async prob? try to put one L3)
// console.log('req.body', req.body)
// console.log({req})

// console.log('header',req.header)
// console.log('body',req.body)
// console.log('body.jwt',req.body.jwt)
// console.log('jwt',req.jwt)