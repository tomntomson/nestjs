import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entities';
import { DataSource, DeleteResult, Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private dataSource: DataSource) {}

    // async testing(users: User[]) {
    //     const queryRunner = this.dataSource.createQueryRunner()

    //     await queryRunner.connect()
    //     await queryRunner.startTransaction()
    //     try {
    //         await queryRunner.manager.save(users[0])
    //         // await queryRunner.manager.save(users[1])

    //         await queryRunner.commitTransaction()
    //     } catch (err) {
    //         await queryRunner.rollbackTransaction()
    //     } finally {
    //         await queryRunner.release()
    //     }
    // }

    signup(createUserDto: CreateUserDto): Promise<User> {
        const {username, password} = createUserDto
        const saltRound = 10
        const salt = bcrypt.genSaltSync(saltRound)
        const hash = bcrypt.hashSync(password, salt)
        const user = new User()
        user.password = hash
        user.username = username
        user.salt = salt

        return this.userRepository.save(user)
    }

    async signin(createUserDto: CreateUserDto): Promise<User> {
        const {username, password} = createUserDto

        const userResult = await this.dataSource
            .getRepository(User)
            .createQueryBuilder("user")
            .where("user.username = :username", { username: username })
            .getOne()
        const { salt } = userResult
        console.log(userResult)
        const hash = bcrypt.hashSync(password, salt)

        const signInResult = await this.dataSource
            .getRepository(User)
            .createQueryBuilder('user')
            .where("user.username = :username", { username: username })
            .andWhere("user.password = :password", {password: hash})
            .getOne()

        return signInResult
    }

    async findById(user_idx: number): Promise<User> {
        return await this.dataSource
            .getRepository(User)
            .createQueryBuilder("user")
            .where("user.user_idx = :user_idx", { user_idx: user_idx})
            .getOne()
    }

    async findAll(): Promise<User[]> {
        return await this.dataSource
            .getRepository(User)
            .createQueryBuilder("user")
            .getMany()
    }

    async updateUser(updateUserDto: UpdateUserDto): Promise<any> {
        const {user_idx, username, password} = updateUserDto
        return await this.dataSource
            .createQueryBuilder()
            .update(User)
            .set({ username: username, password: password})
            .where("user_idx = :user_idx", { user_idx: user_idx })
    }

    async remove(user_idx: number): Promise<DeleteResult> {
        return await this.dataSource
            .createQueryBuilder()
            .delete()
            .from(User)
            .where("user.user_idx = :user_idx", { user_idx: user_idx})
            .execute()
    }
}
