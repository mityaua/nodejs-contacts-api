const express = require('express')
const router = express.Router()

const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../model')

// Роут для списка всех контактов
router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts()

    res.status(200).json({ contacts, status: 'success' })
  } catch (error) {
    next(error)
  }
})

// Роут для контакта по id
router.get('/:contactId', async (req, res, next) => {
  const { contactId: id } = req.params

  try {
    const contact = await getContactById(id)

    if (!contact) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.status(200).json({ contact, status: 'success' })
  } catch (error) {
    next(error)
  }
})

// Роут для создания контакта
router.post('/', async (req, res, next) => {
  try {
    const contact = await addContact(req.body)

    res.status(201).json({ contact, status: 'success' })
  } catch (error) {
    next(error)
  }
})

// Роут для удаления контакта
router.delete('/:contactId', async (req, res, next) => {
  const { contactId: id } = req.params

  try {
    const result = await removeContact(id)

    if (!result) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.status(200).json({ message: 'contact deleted' })
  } catch (error) {
    next(error)
  }
})

// Роут для обновления контакта
router.put('/:contactId', async (req, res, next) => {
  try {
    const contact = await updateContact(req.params.contactId, req.body)

    if (!contact) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.status(200).json({ contact, status: 'success' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
