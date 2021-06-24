// Мидлвар для валидации
const Joi = require('joi')

// Схема валидации регистрации юзера
const schemaRegUser = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'ua', 'ru', 'gov', 'ca'] } })
    .pattern(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i)
    .required(),
  password: Joi.string()
    .min(5)
    .max(20)
    .required(),
  subscription: Joi.string().default('starter'),
})

// Схема валидации логина юзера
const schemaLoginUser = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'ua', 'ru', 'gov', 'ca'] } })
    .pattern(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i)
    .required(),
  password: Joi.string()
    .required()
})

// Мидлвар для обработки ошибок валидации body
const validate = (schema, res, req, next) => {
  const validationBody = schema.validate(req.body)

  if (validationBody.error) {
    return res.status(400).json({ message: validationBody.error.message.replace(/"/g, '') })
  }
  next()
}

module.exports = {
  regValidation: (req, res, next) => {
    return validate(schemaRegUser, res, req, next)
  },
  loginValidation: (req, res, next) => {
    return validate(schemaLoginUser, res, req, next)
  }
}
