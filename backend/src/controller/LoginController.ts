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

        const token = jwt.sign({id_user: user.id_user}, "zUVnomh1DIVN4lBd4PpStnTxngwKjsO", {
            expiresIn: '8h'
        })

        const { password: _, ...userlogin } = user

        return response.json({
            user: userlogin,
            token: token
        })
    }





}