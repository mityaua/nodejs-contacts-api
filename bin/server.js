const app = require('../app')
const db = require('../db')

const PORT = process.env.PORT || 3000

const start = async () => {
  try {
    await db()

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  } catch (err) {
    console.log(`Server not running. Error message: ${err.message}`)
  }
}

start()
