import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {

    constructor(private postService:PostsService){

    }

    @UseInterceptors(FileInterceptor(('image')))
    @Post()
    createPost(@Body()dto: CreatePostDto, @UploadedFile() image){
        return this.postService.create(dto, image);
    }
}
