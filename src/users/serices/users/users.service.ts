import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { createUserParams, createUserProfileParams, UpdateUserParams } from 'src/utiles/types';
import { Profile } from 'src/typeorm/entities/profile';

@Injectable()
export class UsersService {
    constructor (@InjectRepository(User) private userRepository:Repository<User>,
    @InjectRepository(Profile) private profileRepository:Repository<Profile>,
    ){}
    findUsers(){return this.userRepository.find()}

    createUser(userDetails:createUserParams){
        const newUser=this.userRepository.create({...userDetails,createdAt:new Date()})
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
                throw new Error("User Not Found");
                
            }
            const newProfile=this.profileRepository.create(CreateserProfileDetails)
            const savedProfile=await this.profileRepository.save(newProfile)
            user.profile=savedProfile
            return this.userRepository.save(user)
        }
} 
