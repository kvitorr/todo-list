import { Request, Response, Router } from "express";
import { LoginController } from "./controller/LoginController";
import { UserController } from "./controller/UserController";
import { authMiddleware } from "./middlewares/authMiddlewares";

export const routes = Router()

const userController: UserController = new UserController()
const loginController: LoginController = new LoginController()

routes.get('/user', userController.getUsers)
routes.post('/cadastro', userController.addUser)
routes.post('/login', loginController.login)
routes.post('/logout', authMiddleware, loginController.logout)

