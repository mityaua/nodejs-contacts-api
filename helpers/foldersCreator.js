const fs = require('fs').promises

// Проверяет права на запись (нужно вынести отдельно в конфиг!!!)
const isAccessible = async (path) => {
  return await fs.access(path).then(() => true).catch(() => false)
}

// Создает папку, если есть права на запись (нужно вынести отдельно в конфиг!!!)
const createFoldereIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder)
  }
}

module.exports = {
  createFoldereIsNotExist
}
