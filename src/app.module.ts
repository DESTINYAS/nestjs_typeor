import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Post } from './typeorm/entities/Posts';
import { Profile } from './typeorm/entities/profile';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:"mysql",
    host:"localhost",
    port:3306,
    username:"Destiny",
    password:"security",
    database:"nestjs_mysql",
    entities:[User,Profile,Post],
    synchronize:true
  }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
