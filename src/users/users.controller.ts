import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entities';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // @Post()
    // testing() {
    //     const user = new User()
    //     user.firstName = "woojin"
    //     user.lastName = "Shim"

    //     this.usersService.testing([user])
    // }
    @Post('signup')
    signup(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.signup(createUserDto)
    }

    @Post('signin')
    signin(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.signin(createUserDto)
    } 

    @Get()
    getList(): Promise<User[]> {
        return this.usersService.findAll()
    }

    @Get(':user_idx')
    findById(
        @Param('user_idx', new ParseIntPipe()) user_idx: number,
    ): Promise<User> {
        console.log('id: ', user_idx)
        return this.usersService.findById(user_idx)
    }

    @Patch()
    editUser(@Body() updateUserDto: UpdateUserDto): Promise<any> {
        return this.usersService.updateUser(updateUserDto)
    }

    @Delete(':user_idx')
    remove(@Param('user_idx', new ParseIntPipe()) user_idx: number): Promise<DeleteResult> {
        console.log(`id ${user_idx} is removed`)
        return this.usersService.remove(user_idx)
    }
}
