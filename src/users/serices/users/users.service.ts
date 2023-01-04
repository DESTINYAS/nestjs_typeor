import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { createUserParams,createUserPostParams, createUserProfileParams, UpdateUserParams } from 'src/utiles/types';
import { Profile } from 'src/typeorm/entities/profile';
import { Post } from 'src/typeorm/entities/Posts';
import { encodePassword } from 'src/utiles/bcrypt';

@Injectable()
export class UsersService {
    constructor (@InjectRepository(User) private userRepository:Repository<User>,
    @InjectRepository(Profile) private profileRepository:Repository<Profile>,
    @InjectRepository(Post) private postRepository:Repository<Post>,
    ){}
    findUsers(){return this.userRepository.find({relations:['profile','posts']})}

    createUser(userDetails:createUserParams){
        const password=encodePassword(userDetails.password)
        console.log(password)
        const newUser=this.userRepository.create({...userDetails,password,createdAt:new Date()})
       return this.userRepository.save(newUser)
    }
    updateUser(id:number,updateUserDetails:UpdateUserParams){
       return this.userRepository.update({id},{...updateUserDetails})
    }
    deleteUser(id:number){
        return this.userRepository.delete(id)
    }
    async createUserProfile(id:number,
        CreateserProfileDetails:createUserProfileParams){
            const user=await this.userRepository.findOneBy({id})
            if(!user){
                throw new HttpException("User Not Found,Cannot Create Profile",
                HttpStatus.BAD_REQUEST)}
            const newProfile=this.profileRepository.create(CreateserProfileDetails)
            const savedProfile=await this.profileRepository.save(newProfile)
            user.profile=savedProfile
            return this.userRepository.save(user)
        }
       
       async createUserPost(id:number,createUserPostDetails:createUserPostParams){
        const user=await this.userRepository.findOneBy({id})
        if(!user){
            throw new HttpException("User Not Found,Cannot Create Post",
            HttpStatus.BAD_REQUEST);
            
        }
            const newPost=this.postRepository.create({...createUserPostDetails,user})
            return this.postRepository.save(newPost)

        }

        findByUsername(username:string){
            return this.userRepository.findOneBy({username});
        }
} 
