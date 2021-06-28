// Обрабатывает загружаемые изображения и переносит их во временную папку
const path = require('path')
const multer = require('multer')

const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage: storage,
  limits: { fieldSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true)
      return
    }

    cb(null, false)
  }
})

module.exports = upload
