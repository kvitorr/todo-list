import { AppDataSource } from "../database";
import { User } from "../entities/User";
import { UserRepository } from "../repository/UserRepository";



export class UserService {

    private userRepository: UserRepository

    constructor(userRepository: UserRepository = new UserRepository(AppDataSource.manager)){
        this.userRepository = userRepository
    }

    public getUsers = async (): Promise<User[] | null> => {
        return await this.userRepository.getUsers()
    }


    public getUserByEmail = async (email: string) => {
        return await this.userRepository.getUserByEmail(email)
    }

    public addUser = async (name: string, email: string, password: string) => {
        const user: User = new User(name, email, password)
        return await this.userRepository.addUser(user)
    }
}