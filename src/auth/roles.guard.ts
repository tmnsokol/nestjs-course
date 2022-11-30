import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { use } from "passport";
import { Observable } from "rxjs";
import { UsersService } from "src/users/users.service";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate{

    constructor(private jwtService: JwtService, private userService: UsersService,
        private reflector: Reflector){

    }
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try{

            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ]);

            if(!requiredRoles){
                return true;
            }

            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]

            if(bearer !=='Bearer' || !token){
                throw new UnauthorizedException({message: 'User not authorized'})
            }

            return new Promise((resolve,reject) =>
            {
                const user = this.jwtService.verify(token);
                this.userService.getUserByEmail(user.email).then((response)=>{
                    req.user = response;
                    resolve(response.roles.some(role => requiredRoles.includes(role.value)));
                }); 
            });
        } catch(e){
            console.log(e);
            
            throw new UnauthorizedException({message: 'User not authorized'})
        }

    }

}