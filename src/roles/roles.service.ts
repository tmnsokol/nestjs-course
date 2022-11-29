import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private rolesRepository: typeof Role) {
        
    }

    async createRole(dto: CreateRoleDto){
        const role = await this.rolesRepository.create(dto);
        return role;
    }


    async getRoleByValue(roleValue: string){
        return await this.rolesRepository.findOne({where: {value: roleValue}});
    }
}
