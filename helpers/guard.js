const passport = require('passport')
require('../config/passport')

// Добавляет в каждый запрос юзера
const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    if (error || !user) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    req.user = user
    return next()
  }
  )(req, res, next)
}

module.exports = guard
