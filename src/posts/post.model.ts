import { ApiProperty } from "@nestjs/swagger";
import { DataType, Model, Column, Table, BelongsToMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";
import { User } from "src/users/user.model";

interface PostCreationAttrs{
    title: string;
    content: string;
    image: string;
    userId: number;
}


@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttrs>{

    @Column({type:DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type:DataType.STRING, unique: true, allowNull: false})
    title: string;

    @Column({type:DataType.STRING, allowNull: false})
    content: string;

    @Column({type:DataType.STRING, allowNull: true})
    image: string;    

    @ForeignKey(()=>User)
    @Column({type:DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    author: User
}