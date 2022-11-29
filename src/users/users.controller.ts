import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    // sign up, sign in, findid, edit_user
    @Post('signup')
    signup(@Body() createUserDto: CreateUserDto): User {
        return this.usersService.signup(createUserDto)
    }

    @Post('signin')
    signin(@Body() createUserDto: CreateUserDto): boolean {
        return this.usersService.signin(createUserDto)
    }

    @Get()
    getList(): User[] {
        return this.usersService.findAll()
    }

    @Get(':user_idx')
    findId(
        @Param('user_idx', new ParseIntPipe()) user_idx: number,
    ): string {
        console.log('id: ', user_idx)
        return this.usersService.findId(user_idx)
    }

    @Patch()
    editUser(@Body() updateUserDto: UpdateUserDto): any {
        return this.usersService.updateUser(updateUserDto)
    }
}
