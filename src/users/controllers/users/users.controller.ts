import { Body,Controller,Delete, Get,Param, Post,Put,ParseIntPipe} from '@nestjs/common';
import { createUserPostDto } from 'src/DTO/createUserPost.dto';
import { createUserProfileDto } from 'src/DTO/createUserProfile.dto';
import { createUserDto } from 'src/DTO/createUsers.dto';
import { updateUserDto } from 'src/DTO/updateUser.dto';
import { UsersService } from 'src/users/serices/users/users.service';


@Controller('users')
export class UsersController {
    constructor (private userService:UsersService){}
    @Get()
    getUsers (){
     return this.userService.findUsers()
        
    }

    @Post()
    createUsers (@Body() createUserDto:createUserDto){ 
        this.userService.createUser(createUserDto)
        return createUserDto
    }
    @Put(':id')
    async updateUserById(@Param('id',ParseIntPipe) id:number,@Body()updateUserDto:updateUserDto){
       await this.userService.updateUser(id,updateUserDto)
    }

    @Delete(':id')
       async deleteUserById(@Param('id',ParseIntPipe)id:number){
        await this.userService.deleteUser(id)

        }

    @Post(':id/profiles')
    createUserProfile(@Param('id',ParseIntPipe)id:number,
     @Body()createUserProfileDto:createUserProfileDto){
        return this.userService.createUserProfile(id,createUserProfileDto)
    }

    @Post(':id/posts')
    createUserPost(@Param('id',ParseIntPipe)id:number,
    @Body()createUserPostDto:createUserPostDto)
    {
        return this.userService.createUserPost(id,createUserPostDto)
    }
}
