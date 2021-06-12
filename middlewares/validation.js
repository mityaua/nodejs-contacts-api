// Мидлвар для валидации
const Joi = require('joi')

// Схема валидации создания контакта
const schemaAddContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'ua', 'ru', 'gov'] } }).required(),
  phone: Joi.string()
    .pattern(/^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/)
    .required(),
})

// Схема валидации обновления контакта
const schemaPatchContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'ua', 'ru', 'gov'] } }).optional(),
  phone: Joi.string()
    .pattern(/^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/)
    .optional(),
}).min(1)

// Мидвар для обработки ошибок валидации
const validate = (schema, res, obj, next) => {
  const validationLogs = schema.validate(obj)

  if (validationLogs.error) {
    return res.status(400).json({ message: validationLogs.error.message.replace(/"/g, '') })
  }

  next()
}

module.exports = {
  addContactValidation: (req, res, next) => {
    return validate(schemaAddContact, res, req.body, next)
  },
  patchContactValidation: (req, res, next) => {
    return validate(schemaPatchContact, res, req.body, next)
  },
}
