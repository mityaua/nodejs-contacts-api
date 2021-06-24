const Contact = require('../schemas/contacts')

// Получает все контакты
const getAllContacts = async (userId, query) => {
  const { page = 1, limit = 20, offset = (page - 1) * limit, sortBy, sortByDesc, filter } = query

  const result = await Contact.paginate({ owner: userId }, {
    page,
    limit,
    offset,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter ? filter.split('|').join(' ') : '',
    populate: { path: 'owner', select: 'email subscription' }
  })

  const { docs: contacts, totalDocs: total, totalPages } = result

  return { contacts, total, totalPages, page: Number(page), limit: Number(limit), offset: Number(offset) }
}

// Находит контакт по id
const getContactById = async (userId, contactId) => {
  const contact = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({ path: 'owner', select: 'email subscription' })
  return contact
}

// Создает новый контакт
const addContact = async (userId, body) => {
  const newContact = await Contact.create({ ...body, owner: userId })
  return newContact
}

// Обновляет контакт - обновляет чужой контакт!
const updateContact = async (userId, contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate({ _id: contactId, owner: userId, }, body, { new: true }).populate({ path: 'owner', select: 'email subscription' })
  return updatedContact
}

// Обновляет статус контакта - обновляет чужой статус!
const updateContactStatus = async (userId, contactId, { favorite }) => {
  const updatedContact = await Contact.findByIdAndUpdate({ _id: contactId, owner: userId, }, { favorite }, { new: true }).populate({ path: 'owner', select: 'email subscription' })
  return updatedContact
}

// Удаляет контакт - удаляет чужой контакт!
const removeContact = async (userId, contactId) => {
  const contact = await Contact.findByIdAndRemove({ _id: contactId, owner: userId, })
  return contact
}

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  updateContactStatus,
  removeContact
}
