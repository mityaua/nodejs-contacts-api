const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const { findUserById } = require('../services/userService')
const SECRET_KEY = process.env.JWT_SECRET_KEY

const params = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

passport.use(new Strategy(params, async (payload, done) => {
  try {
    console.log(payload)
    const user = await findUserById(payload.id)
    console.log(user)

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
