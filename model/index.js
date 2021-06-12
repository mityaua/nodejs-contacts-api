const fs = require('fs').promises
const path = require('path')

const { customAlphabet } = require('nanoid')
const newId = customAlphabet('1234567890', 10)

const contactsFile = path.join(__dirname, 'contacts.json') // Путь к файлу с контактами

// Читает файл со всеми контактами и возвращает результата парса
const readContactsFile = async (contacts) => {
  const data = await fs.readFile(contacts, 'utf8')

  return JSON.parse(data)
}

// Получает все контакты
const listContacts = async () => {
  try {
    return await readContactsFile(contactsFile)
  } catch (error) {
    console.error(error.message)
  }
}

// Находит в файле контакт по id
const getContactById = async (contactId) => {
  try {
    const contacts = await readContactsFile(contactsFile)

    // Если в контактах есть такой id, тогда ищет нужный контакт в массиве
    if (contacts.some(contact => contact.id === Number(contactId))) {
      const contactById = contacts.find(
        contact => contact.id === Number(contactId)
      )

      return contactById
    }
  } catch (error) {
    console.error(error.message)
  }
}

// Создает в файле новый контакт
const addContact = async (body) => {
  const { name, email, phone } = body

  // Формирует новый контакт с уникальным id
  const newContact = {
    id: Number(newId()),
    name,
    email,
    phone
  }

  try {
    const contacts = await readContactsFile(contactsFile)

    const newContacts = [...contacts, newContact]

    await fs.writeFile(contactsFile, JSON.stringify(newContacts, null, 2))

    return newContact
  } catch (error) {
    console.error(error.message)
  }
}

// Удаляет контакт из файла
const removeContact = async (contactId) => {
  try {
    const contacts = await readContactsFile(contactsFile)

    // Ищет в массиве хотя бы одно совпадение по id. Если есть, тогда фильтрует массив
    if (contacts.some(contact => contact.id === Number(contactId))) {
      const newContacts = contacts.filter(
        contact => contact.id !== Number(contactId)
      )

      await fs.writeFile(contactsFile, JSON.stringify(newContacts, null, 2))

      return newContacts
    }
  } catch (error) {
    console.error(error.message)
  }
}

// Обновляет контакт
const updateContact = async (contactId, body) => {
  try {
    const contacts = await readContactsFile(contactsFile)

    // Находит нужный контакт по id
    const neededСontact = contacts.find(
      contact => contact.id === Number(contactId)
    )

    // Если контакт есть, тогда формируем новый
    if (neededСontact) {
      const updatedСontact = {
        ...neededСontact,
        ...body
      }

      // Проходимся по массиву контактов, если id совпадает, тогда возвращаем обновленный контакт (или же старый)
      const result = contacts.map(contact => {
        if (contact.id === Number(contactId)) {
          return updatedСontact
        } else return contact
      })

      await fs.writeFile(contactsFile, JSON.stringify(result, null, 2))

      return updatedСontact
    }
  } catch (error) {
    console.error(error.message)
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
}
