const app = require('../app')
const db = require('../db')

const path = require('path')
const fs = require('fs').promises

const PORT = process.env.PORT || 3000
const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR)
const AVATARS_DIR = path.join(process.cwd(), process.env.PUBLIC_DIR, process.env.USERS_AVATARS)

// Проверяет права на запись (нужно вынести отдельно !!!)
const isAccessible = async (path) => {
  return await fs.access(path).then(() => true).catch(() => false)
}

// Создает папку, если есть права на запись (нужно вынести отдельно !!!)
const createFoldereIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder)
  }
}

// Старт сервера с подключением к базе
const start = async () => {
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

start()
