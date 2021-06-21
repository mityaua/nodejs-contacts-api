const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()

const usersRouter = require('./routes/api/users')
const contactsRouter = require('./routes/api/contacts')

const { errorHandler } = require('./helpers/errorHandler')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/contacts', contactsRouter)

// Ответ на всех урлы, которые не заматчились с роутами
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

// Обработчик всех ошибок
app.use(errorHandler)

module.exports = app
