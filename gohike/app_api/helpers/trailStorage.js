const multer = require('multer');

const diskTrailStorage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null,'trailImages');
    },
    filename:(req, file, cb)=>{
        const mimeType = file.mimetype.split('/');
        const fileType = mimeType[1];
        const fileName = file.originalname + '.' + fileType;
        cb(null, fileName)
    }
})

const fileTrailFilter = (req, file, cb) =>{
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true): cb(null, false)
}

const trailStorage = multer({storage: diskTrailStorage, fileFilter: fileTrailFilter }). single('imagePath');

module.exports = trailStorage;