import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcryptjs from 'bcryptjs'
import { User } from 'src/users/user.model';

@Injectable()
export class AuthService {
    
    constructor(private userService: UsersService,
                private jwtService: JwtService
        ) {
        
    }
    async login(userDto: CreateUserDto){
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }   

    async registration(userDto: CreateUserDto){
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if(candidate){
            throw new HttpException(`User with the email: ${userDto.email} not found`, HttpStatus.BAD_REQUEST)
        }

        const hashPasssword = await bcryptjs.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPasssword});

        return this.generateToken(user);
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        const passwordEquals = await bcryptjs.compare(userDto.password, user.password)
        
        if(user && passwordEquals){
            return user;
        }

        throw new UnauthorizedException({message: 'Wrong login or password.'});
    }

    private async generateToken(user: User){
        const payload = {email: user.email, id: user.id, roles: user.roles };
        return {
            token: this.jwtService.sign(payload)
            //     ,{
            //     secret: process.env.SECRET
            // })
        };
    }
}
