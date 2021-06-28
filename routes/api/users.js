const express = require('express')
const router = express.Router()

const {
  regController,
  loginController,
  logoutController,
  currentUserController,
  subscriptionController,
  avatarController
} = require('../../controllers/usersController') // Контроллеры маршрутов

const { regLogValidation, subscriptionValidation } = require('../../middlewares/userValidation') // Валидации Joi
const { protect } = require('../../middlewares/protect') // Мидлвар протекции роутов
const { asyncWrapper } = require('../../helpers/asyncWrapper') // Мидлвар универсального обработчика try catch
const upload = require('../../helpers/uploadHandler') // Обработчик загрузок

router.post('/signup', regLogValidation, asyncWrapper(regController)) // Регистрация юзера
router.post('/login', regLogValidation, asyncWrapper(loginController)) // Входа юзера
router.post('/logout', protect, asyncWrapper(logoutController)) // Выход юзера
router.get('/current', protect, asyncWrapper(currentUserController)) // Текущий юзер
router.patch('/subscription', protect, subscriptionValidation, asyncWrapper(subscriptionController)) // Обновление подписки
router.patch('/avatars', protect, upload.single('avatar'), asyncWrapper(avatarController)) // Обновление аватара + сделать ВАЛИДАЦИЮ!!!!

module.exports = router
