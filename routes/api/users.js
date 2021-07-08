const express = require('express')
const router = express.Router()

const {
  regController,
  loginController,
  logoutController,
  currentUserController,
  subscriptionController,
  avatarController,
  verifyController,
  reVerifyController
} = require('../../controllers/usersController') // Контроллеры маршрутов

const { regLogValidation, subscriptionValidation, reVerifyValidation } = require('../../middlewares/userValidation') // Валидации Joi
const { protect } = require('../../middlewares/protect') // Мидлвар протекции роутов
const { asyncWrapper } = require('../../helpers/asyncWrapper') // Мидлвар универсального обработчика try catch
const upload = require('../../helpers/upload') // Обработчик загрузок

router.post('/signup', regLogValidation, asyncWrapper(regController)) // Регистрация юзера
router.get('/verify/:verificationToken', asyncWrapper(verifyController)) // Верификация юзера
router.post('/verify/', reVerifyValidation, asyncWrapper(reVerifyController)) // Запрос повторной верификации юзера
router.post('/login', regLogValidation, asyncWrapper(loginController)) // Вход юзера
router.post('/logout', protect, asyncWrapper(logoutController)) // Выход юзера
router.get('/current', protect, asyncWrapper(currentUserController)) // Текущий юзер
router.patch('/subscription', protect, subscriptionValidation, asyncWrapper(subscriptionController)) // Обновление подписки
router.patch('/avatars', protect, upload.single('avatar'), asyncWrapper(avatarController)) // Обновление аватара

module.exports = router
