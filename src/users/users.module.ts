import { forwardRef, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthPassportGuard } from 'src/auth/jwt-auth-passport.guard';
import { Role } from 'src/roles/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { UserRoles } from 'src/roles/user-roles.model';
import { User } from './user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService,
    //enable guard globally
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthPassportGuard,
    // },
  ],
  imports:[
    SequelizeModule.forFeature([User, Role, UserRoles]),
    RolesModule,
    forwardRef(()=>AuthModule)
  ],
   exports: [UsersService]
})
export class UsersModule {}
