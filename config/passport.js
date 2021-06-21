const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const { findUserById } = require('../services/userService')
const SECRET_KEY = process.env.JWT_SECRET_KEY

// Вытягивает токен
const params = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

// Стратегия - перехватывает токен и кидает в payload
passport.use(new Strategy(params, async (payload, done) => {
  try {
    const user = await findUserById(payload.id)

    if (!user) {
      return done(new Error('User not found'))
    }

    if (!user.token) {
      return done(null, false)
    }

    return done(null, user)
  } catch (error) {
    done(error)
  }
}))
