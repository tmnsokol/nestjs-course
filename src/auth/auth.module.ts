import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt-strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    forwardRef(()=>UsersModule),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: '1h'
      }
    }),
    PassportModule
  ],
  exports: [AuthService, JwtModule] 
})
export class AuthModule {}
