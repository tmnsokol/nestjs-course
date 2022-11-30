import { ApiProperty } from "@nestjs/swagger";
import { DataType, Model, Column, Table, BelongsToMany, HasMany, ForeignKey } from "sequelize-typescript";
import { Post } from "src/posts/post.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttrs{
    email: string;
    password: string;
}


@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs>{

    @ApiProperty({example: '1', description: 'Unique value'})
    @Column({type:DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'test@test.com', description: 'User email'})
    @Column({type:DataType.STRING, unique: true, allowNull: true})
    email: string;

    @ApiProperty({example: '123456', description: 'User password'})
    @Column({type:DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'true', description: 'Is user banned?'})
    @Column({type:DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: 'Some reason', description: 'Reason of ban'})
    @Column({type:DataType.STRING, allowNull: true})
    banReason: string;

    @BelongsToMany(()=> Role, () => UserRoles)
    roles: Role[]
    
    @HasMany(() => Post)
    posts: Post[]
}