const multer = require('multer')


const MIME_TYPES = {  
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
}


const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'multer-programmes')
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split('.')[0]
    const extension = MIME_TYPES[file.mimetype]
    callback(null, name + '.' + extension)
  }
})


module.exports = multer({storage: storage}).array('multer-programmes', 3)