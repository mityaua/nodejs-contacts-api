const app = require('../app')
const mongoose = require('mongoose')

const connection = mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false, })

const PORT = process.env.PORT || 3000

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log('Database connection successful')
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`),
  )
