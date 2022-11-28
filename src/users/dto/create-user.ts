import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto{

   @ApiProperty({example: 'test@test.com', description: 'email of user'})
   readonly  email: string;
   @ApiProperty({example: '123456', description: 'password of user'})
   readonly password: string;
}