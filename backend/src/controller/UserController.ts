import { Request, Response } from "express";
import { User } from "../entities/User";
import { UserService } from "../service/UserService";
import bcrypt from 'bcrypt'




export class UserController {

    private userService: UserService

    constructor(userService: UserService = new UserService()){
        this.userService = userService;
    }

    public getUsers = async (request: Request, response: Response) => {

        console.log('aaaaaaaaa')

        const users: User[] | null = await this.userService.getUsers()

        return response.status(200).json(users)
    }

    public getUserByEmail = async (request: Request, response: Response) => {
        const email: string = request.params.email
        console.log(email)

        const user: User | null = await this.userService.getUserByEmail(email)

        if(!user){
            throw new Error("E-mail ou senha inválidos.")
        }

        return response.status(200).json({
            id_user: user?.id_user,
            name: user?.name,
            email: user?.email
        })
    }
    public addUser = async (request: Request, response: Response) => {
        const { name, email, password } = request.body
        const user: User | null = await this.userService.getUserByEmail(email)

        if(user){
            throw new Error("E-mail já cadastrado.")
        }

        const hashPassword: string = await bcrypt.hash(password, 10)
        const newUser = await this.userService.addUser(name, email, hashPassword)

        return response.status(200).json({message: "usuário cadastrado"})
    }
}