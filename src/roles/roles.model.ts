import { ApiProperty } from "@nestjs/swagger";
import { DataType, Model, Column, Table, BelongsToMany, ForeignKey } from "sequelize-typescript";
import { User } from "src/users/user.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttrs{
    value: string;
    description: string;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs>{

    @ApiProperty({example: '1', description: 'Unique value'})
    @Column({type:DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'ADMIN', description: 'Name of role'})
    @Column({type:DataType.STRING, unique: true, allowNull: true})
    value: string;

    @ApiProperty({example: 'ADMIN of website', description: 'Description of role'})
    @Column({type:DataType.STRING, allowNull: false})
    description: string;

    @BelongsToMany(()=> User, () => UserRoles)
    users: User[]
}