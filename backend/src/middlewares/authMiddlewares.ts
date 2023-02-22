import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

type JwtPayload = {
    email: string
}

export const authMiddleware = (request: Request | any, response: Response, nextFunction: NextFunction) => {
    const token = request.signedCookies['token'];

    console.log('auth token: ', token)

    if (!token) {
        return response.status(401).send('Token não fornecido');
    }

    try {
        const { email } = jwt.verify(token, 'zUVnomh1DIVN4lBd4PpStnTxngwKjsO') as JwtPayload;
        console.log('testando')

        request.email = email; // Adiciona as informações do usuário decodificadas ao objeto 'request'

        console.log('testando')

        nextFunction(); // Chama a próxima função de middleware na cadeia
    } catch (err) {
        return response.status(401).send('Token inválido ou expirado');
    }
}