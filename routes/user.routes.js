import { Router } from 'express'
import * as userController from '../controllers/user.controller.js'
import { VerifyRegister, VerifyLogin } from '../middlewares/verify.register.js'

const router = Router()

router
  .post('/login', VerifyLogin, userController.login)
  .post('/register', VerifyRegister, userController.register)
  .post('/token', userController.token)

export default router
