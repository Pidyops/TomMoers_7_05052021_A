const multer = require('multer');

const MIME_TYPE = {
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpeg',
    'image/png' : 'png'
}

const storage = multer.diskStorage({
    
    destination: (req, file, callback) => { 
        callback(null, "images"); 
    },
    filename: (req, file, callback) => { 
        const name = file.originalname.split(' ').join('_');
        const stringName = JSON.stringify(name);
        const extension = MIME_TYPE[file.mimetype]; 
        callback(null, Date.now() + '--' + name); 
    }
})


module.exports = multer({storage: storage}).single('image'); 
