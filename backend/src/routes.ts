import { Router } from "express";
import { LoginController } from "./controller/LoginController";
import { UserController } from "./controller/UserController";

export const routes = Router()

const userController: UserController = new UserController()
const loginController: LoginController = new LoginController()

routes.get('/user/:email', userController.getUserByEmail)
routes.post('/user', userController.addUser)
routes.post('/login', loginController.login)