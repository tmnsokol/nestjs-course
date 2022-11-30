import { ApiProperty } from "@nestjs/swagger";
import { IsString,Length, IsEmail } from "class-validator";

export class CreateUserDto{

   @ApiProperty({example: 'test@test.com', description: 'email of user'})
   @IsString({message:'The field should be string.'})
   @IsEmail({}, {message:'The field should be in email format.'})
   readonly  email: string;

   @ApiProperty({example: '123456', description: 'password of user'})
   @IsString({message:'The field should be string.'})
   @Length(4,14, {message:'Length should be in range[4,14]'})

   readonly password: string;
}