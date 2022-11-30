import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { use } from 'passport';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user';
import { User } from './user.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService) {
    }

    async createUser(dto: CreateUserDto){
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("USER");
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
