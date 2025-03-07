const express = require('express')
const helmet = require('helmet')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()

const usersRouter = require('./routes/api/users')
const contactsRouter = require('./routes/api/contacts')

const { errorHandler } = require('./helpers/errorHandler')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(helmet())
app.use(cors())
app.use(express.json({ limit: 1000 }))
app.use(express.static(process.env.PUBLIC_DIR))

app.use('/api/users', usersRouter)
app.use('/api/contacts', contactsRouter)

// Ответ на всех урлы, которые не заматчились
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use(errorHandler) // Обработчик всех ошибок

module.exports = app
