import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/Posts';
import { Profile } from 'src/typeorm/entities/profile';
import { User } from 'src/typeorm/entities/User';
import { UsersService } from 'src/users/serices/users/users.service';
import { localStrategy } from 'src/utiles/localStrategy';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';

@Module({
  imports:[TypeOrmModule.forFeature([User,Profile,Post]),PassportModule],
  controllers: [AuthController],
  providers: [
    {
    provide:'AUTH_SERVICE',
    useClass:AuthService
  },
    {
    provide:'USER_SERVICE',
    useClass:UsersService
  },
  localStrategy
]
})
export class AuthModule {}
