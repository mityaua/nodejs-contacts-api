const fs = require('fs').promises
const path = require('path')

const { customAlphabet } = require('nanoid')
const newId = customAlphabet('1234567890', 10)

const contactsFile = path.join(__dirname, 'contacts.json')

// Читает файл со всеми контактами
const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsFile, 'utf8')

    return JSON.parse(data)
  } catch (error) {
    console.error(error.message)
  }
}

// Находит в файле контакт по id
const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsFile, 'utf8')
    const parsedContacts = JSON.parse(data)

    if (parsedContacts.some(contact => contact.id === Number(contactId))) {
      const contact = parsedContacts.find(
        contact => contact.id === Number(contactId)
      )

      return contact
    }
  } catch (error) {
    console.error(error.message)
  }
}

// Создает в файле новый контакт
const addContact = async (body) => {
  const { name, email, phone } = body // ДОБАВИТЬ ВАЛИДАЦИЮ!!!

  const newContact = {
    id: Number(newId()),
    name,
    email,
    phone
  }

  try {
    const data = await fs.readFile(contactsFile, 'utf8')
    const parsedContacts = JSON.parse(data)

    const newContacts = [...parsedContacts, newContact]

    await fs.writeFile(contactsFile, JSON.stringify(newContacts, null, 2))

    return newContact
  } catch (error) {
    console.error(error.message)
  }
}

// Удаляет контакт из файла
const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsFile, 'utf8')
    const parsedContacts = JSON.parse(data)

    // Ищет в массиве хотя бы одно совпадение по id. Если есть, тогда фильтрует массив
    if (parsedContacts.some(contact => contact.id === Number(contactId))) {
      const filteredContacts = parsedContacts.filter(
        contact => contact.id !== Number(contactId)
      )

      await fs.writeFile(contactsFile, JSON.stringify(filteredContacts, null, 2))

      return filteredContacts
    }
  } catch (error) {
    console.error(error.message)
  }
}

// Обновляет контакт - ДОБАВИТЬ ВАЛИДАЦИЮ!!!
const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsFile, 'utf8')
    const parsedContacts = JSON.parse(data)

    // Находит нужный контакт по id
    const neededСontact = parsedContacts.find(
      contact => contact.id === Number(contactId)
    )

    // Если контакт есть, тогда обновляем его
    if (neededСontact) {
      const updatedСontact = {
        ...neededСontact,
        ...body
      }

      // Проходимся по массиву контактов, если id совпадает, тогда возвращаем обновленный контакт (или старый)
      const result = parsedContacts.map(contact => {
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
