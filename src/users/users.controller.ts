import { Body,Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user';
import { User } from './user.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {
    }
   
    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    async getAllUsers(){
        return this.userService.getAllUsers();
    }

    @ApiOperation({summary: 'Create user'})
    @ApiResponse({status: 201, type: User})
    @Post()
    async createUser(@Body() dto: CreateUserDto){
        console.log(dto);
        
        return this.userService.createUser(dto);
    }
}
