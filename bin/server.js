const app = require('../app')
const path = require('path')
const db = require('../db')
const { createFoldereIsNotExist } = require('../helpers/foldersCreator')

const PORT = process.env.PORT || 3000
const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR)
const AVATARS_DIR = path.join(process.cwd(), process.env.PUBLIC_DIR, process.env.USERS_AVATARS)

// Старт сервера с подключением к базе
const server = async () => {
  try {
    await db()

    app.listen(PORT, async () => {
      await createFoldereIsNotExist(UPLOAD_DIR)
      await createFoldereIsNotExist(AVATARS_DIR)
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  } catch (err) {
    console.log(`Server not running. Error message: ${err.message}`)
  }
}

server()
