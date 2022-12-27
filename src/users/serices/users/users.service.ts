import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { createUserParams, UpdateUserParams } from 'src/utiles/types';

@Injectable()
export class UsersService {
    constructor (@InjectRepository(User) private userRepository:Repository<User>,){}
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
}
