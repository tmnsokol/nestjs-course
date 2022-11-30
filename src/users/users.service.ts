import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { use } from 'passport';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import * as bcryptjs from 'bcryptjs'

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService) {
    }

    async createUser(dto: CreateUserDto){
        const users = await this.userRepository.findAll({where: {email: dto.email}});
        if(users.length > 0){
            throw new HttpException(`User with the email ${dto.email} already exist.`, HttpStatus.BAD_REQUEST);
        }

        const hashPasssword = await bcryptjs.hash(dto.password, 5);
        const user = await this.userRepository.create({...dto, password: hashPasssword});
        let role = await this.roleService.getRoleByValue("USER");
        if(!role) {
            role = await this.roleService.createRole({value: "USER", description: "Some description"});
        }

        await user.$set('roles', [role.id])
        user.roles = [role]
        return user;
    }

    async getAllUsers(){
        return await this.userRepository.findAll({include: 'roles'});
    }

    async getUserByEmail(email:string){
        return await this.userRepository.findOne({where: {email:email}, include: {all: true}});
    }

    async addRole(dto: AddRoleDto){
        const user = await this.userRepository.findOne({where: {id: dto.userId}});
        const role =  await this.roleService.getRoleByValue(dto.value);

        if(user && role){
            user.$add('role', role.id);
            return dto;
        }

        throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
    }
    
    async banUser(dto: BanUserDto){
        const user = await this.userRepository.findOne({where: {id: dto.userId}});

        if(!user){
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();
        return user;
    }
}
