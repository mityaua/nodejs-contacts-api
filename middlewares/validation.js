// Мидлвар для валидации
const Joi = require('joi')

module.exports = {
  addContactValidation: (req, res, next) => {
    // Определение схемы валидации данных
    const schema = Joi.object({
      name: Joi.string().alphanum().min(2).max(30).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'ua', 'ru', 'gov'] } }).required(),
      phone: Joi.string()
        .pattern(/^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/)
        .required(),
    })

    // Записываем в переменную результат валидации
    const validationResult = schema.validate(req.body)

    // Обрабатываем ошибку валидации
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.message.replace(/"/g, '') })
    }

    next()
  },

  patchContactValidation: (req, res, next) => {
    // Определение схемы валидации данных
    const schema = Joi.object({
      name: Joi.string().alphanum().min(2).max(30).optional(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'ua', 'ru', 'gov'] } }).optional(),
      phone: Joi.string()
        .pattern(/^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/)
        .optional(),
    }).min(1)

    // Записываем в переменную результат валидации
    const validationResult = schema.validate(req.body)

    // Обрабатываем ошибку валидации
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.message.replace(/"/g, '') })
    }

    next()
  },
}
