import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import { AppDataSource } from "../database"
import brcrypt from 'bcrypt'
import { User } from "../entities/User"
import { UserService } from "../service/UserService"

export class LoginController {
    private userService: UserService

    constructor(userService: UserService = new UserService()){
        this.userService = userService
    }


    public login = async (request: Request, response: Response) => {
        const { email, password } = request.body

        const user: User | null = await this.userService.getUserByEmail(email)

        if(!user){
            throw new Error('E-mail ou senha inválidos')
        }

        const verifyPassword = await brcrypt.compare(password, user.password)

        if(!verifyPassword) {
            throw new Error('E-mail ou senha inválidos')
        }

        const token = jwt.sign({email: user.email}, "zUVnomh1DIVN4lBd4PpStnTxngwKjsO", {
            expiresIn: '8h'
        })

        console.log('login token: ', token)

          // Armazenar o token no cookie assinado
        response.cookie('token', token, { httpOnly: true, signed: true });

        return response.status(200).json({message: "Usuário logado com sucesso"})
       
    }

    public logout = (request: Request, response: Response) => {
        return response.clearCookie('token')
        .status(200)
        .json({ message: "Successfully logged out 😏 🍀" });
    }
}