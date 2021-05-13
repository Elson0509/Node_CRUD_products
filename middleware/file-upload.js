const multer = require('multer')
const MIME_TYPE_MAP = {
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
}

const fileUpload = multer({
    limits: 50000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/img')
        },
        filename:(req, file, cb) => {
            cb(null, req.params.productId + '.jpg')
        }
    }),
    fileFilter: (req, file, cb) => {
        const isValid = !!MIME_TYPE_MAP[file.mimetype]
        let error = isValid ? null : new Error('Invalid mime type!')
        cb(error, isValid)
    }
})

module.exports = fileUpload