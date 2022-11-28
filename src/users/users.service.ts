import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user';
import { User } from './user.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User) {
        
    }

    createUser(dto: CreateUserDto){
        return this.userRepository.create(dto);
    }

    getAllUsers(){
        return this.userRepository.findAll();
    }
}
