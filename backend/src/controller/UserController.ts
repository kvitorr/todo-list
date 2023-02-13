import { Request, Response } from "express";
import { User } from "../entities/User";
import { UserService } from "../service/UserService";
import bcrypt from 'bcrypt'




export class UserController {

    private userService: UserService

    constructor(userService: UserService = new UserService()){
        this.userService = userService;
    }

    public getUserByEmail = async (request: Request, response: Response) => {
        const email: string = request.params.email

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

        console.log(request.body)

        if(user){
            throw new Error("E-mail já cadastrado.")
        }

        const hashPassword: string = await bcrypt.hash(password, 10)
        const newUser: User = await this.userService.addUser(name, email, hashPassword)

        return response.status(201).json( { 
            id_user: newUser.id_user,
            name: newUser.name,
            email: newUser.email
         } )
    }
}