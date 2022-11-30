import { Body,Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthPassportGuard } from 'src/auth/jwt-auth-passport.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {
    }
   
    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({status: 200, type: [User]})
    // @UseGuards(JwtAuthGuard)
    @UseGuards(JwtAuthPassportGuard)
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    async getAllUsers(){
        return this.userService.getAllUsers();
    }

    @ApiOperation({summary: 'Create user'})
    @ApiResponse({status: 201, type: User})
    @UsePipes(ValidationPipe)
    @Post()
    async createUser(@Body() dto: CreateUserDto){
        console.log(dto);
        
        return this.userService.createUser(dto);
    }

    @ApiOperation({summary: 'Provide role'})
    @ApiResponse({status: 200})
    // @UseGuards(JwtAuthGuard)
    @UseGuards(JwtAuthPassportGuard)
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/role')
    async addRole(@Body()dto: AddRoleDto){
        return this.userService.addRole(dto);
    }

    @ApiOperation({summary: 'Ban user'})
    @ApiResponse({status: 200})
    // @UseGuards(JwtAuthGuard)
    @UseGuards(JwtAuthPassportGuard)
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/ban')
    async banUse(@Body()dto: BanUserDto){
        return this.userService.banUser(dto);
    }
}
