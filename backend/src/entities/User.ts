import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Todo } from "./Todo"

@Entity('usert')
export class User {
    @PrimaryGeneratedColumn()
    id_user?: number

    @Column()
    name: string

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @OneToMany(() => Todo, (todo) => todo.user)
    todos?: Todo[]

    constructor(name: string, email: string, password: string){
        this.email = email;
        this.name = name;
        this.password = password;
    }
}