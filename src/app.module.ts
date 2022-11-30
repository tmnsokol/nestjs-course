import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/user.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSGRES_USER,
      password: process.env.POSGRES_PASSWORD,
      database: process.env.POSGRES_DB,
      models: [User, Role, UserRoles],
      autoLoadModels: true
    }),
    UsersModule,
    RolesModule,
    AuthModule,
  ],

  controllers: [],
  providers: []
})
export class AppModule {}
