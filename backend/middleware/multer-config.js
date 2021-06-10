
const multer = require('multer'); //import

const MIME_TYPE = {
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpeg',
    'image/png' : 'png'
}

const storage = multer.diskStorage({
    
    destination: (req, file, callback) => { // where to store
        callback(null, "images"); // call it and pass 2 arguments (error, file)
    },
    filename: (req, file, callback) => { //file name function
        // console.log('multer: file',file)
        const name = file.originalname.split(' ').join('_'); // keep the original name without any space error
        const stringName = JSON.stringify(name);
        const extension = MIME_TYPE[file.mimetype]; // file extension
        // callback(null, name + Date.now() + '.' + extension); //say how we name the image. (we add date to avoid doublon)
        callback(null, Date.now() + '--' + name); //say how we name the image. (we add date to avoid doublon)
        // callback(null, name);
        console.log('multer storage')
    }
})


module.exports = multer({storage: storage}).single('image');   //({key: name of the const}) one file
