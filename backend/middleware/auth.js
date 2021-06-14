const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => { // export our middleware
    headersId = parseInt(req.headers.id)

     try {
        const token = req.headers.jwt; 
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET) 
        const userId = decodedToken.id; 
        if (headersId === userId) {
            req.userId = userId
            next();
        } else {
            return res.status(403).json('Invalid Token')

        }
     } catch {
        //  console.log('catch')
        return res.status(401).json({ status: 401, message: 'Invalid request! (token)'});
     }
};
