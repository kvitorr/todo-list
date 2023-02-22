import { EntityManager } from "typeorm";
import { User } from "../entities/User";


export class UserRepository {

    private manager: EntityManager

    constructor(manager: EntityManager){
        this.manager = manager
    }

    public getUsers = async (): Promise<User[] | null> => {
        return await this.manager.find(User)
    }
 

    public getUserByEmail = async (email: string): Promise<User | null> => {

        console.log(email)
        return await this.manager.findOne(User, {
            where: {
                email
            }
        })
    }

    public getUserById = async (id_user: number): Promise<User | null> => {
        return await this.manager.findOne(User, {
            where: {
                id_user
            }
        })
    }

    public addUser = async (user: User) => {
        return await this.manager.save(user)
    }








}