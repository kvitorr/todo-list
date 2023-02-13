import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity('todo')
export class Todo {
    @PrimaryGeneratedColumn()
    id_todo: number

    @Column()
    description: string

    @Column()
    done: boolean

    @ManyToOne(() => User, (user) => user.todos)
    user: User

    constructor(id_todo: number, description: string, done: boolean, user: User){
        this.description = description
        this.done = done
        this.id_todo = id_todo
        this.user = user
    }
}