// Обрабатывает загружаемые изображения и переносит их во временную папку
const path = require('path')
const multer = require('multer')
const { customAlphabet } = require('nanoid')
const nanoid = customAlphabet('1234567890abcdef', 10)

const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR)
  },
  filename: function (req, file, cb) {
    cb(null, nanoid() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: { fieldSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg') {
      cb(null, true)
      return
    }

    cb(null, false)
  }
})

module.exports = upload
