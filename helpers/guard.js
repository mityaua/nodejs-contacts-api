const passport = require('passport')
require('../config/passport')

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    if (error || !user) {
      return res.status(401).json({ message: 'Not authorized' })
      // next ?
    }
    req.user = user
    return next()
  }
  )(req, res, next)
}

module.exports = guard
