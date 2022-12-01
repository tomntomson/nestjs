import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_idx: number

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    salt: string

    @Column({default: true})
    isActive: boolean
}