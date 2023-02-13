import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { AppDataSource } from "../database";
import { UserRepository } from "../repository/UserRepository";

type JwtPayload = {
    id: number
}

const userRepository = new UserRepository(AppDataSource.manager)

export const authMiddleware = async (request: Request, response: Response, nextFunction: NextFunction) => {
    const { authorization } = request.headers

    if(!authorization){
        throw new Error('Não autorizado')
    }

    const token = authorization.split(" ")[1]

    const { id } = jwt.verify(token, "zUVnomh1DIVN4lBd4PpStnTxngwKjsO") as JwtPayload

    const user = await userRepository.getUserById(id)

    if(!user){
        throw new Error("Não autorizado")
    }

    const { password:_, ...loggedUser } = user

    request.user = user

    nextFunction()
}