import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Profile } from 'src/typeorm/entities/profile';
import { User } from 'src/typeorm/entities/User';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './serices/users/users.service';

@Module({
  imports:[TypeOrmModule.forFeature([User,Profile])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
