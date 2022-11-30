import { IsString } from "class-validator";

export class AddRoleDto{
   @IsString({message:'The field should be string.'})
    readonly value: string;
   @IsString({message:'The field should be number.'})
    readonly userId: number;
}