import { Inject,Injectable} from '@nestjs/common';
import { UsersService } from 'src/users/serices/users/users.service';
import { comparePasswords } from 'src/utiles/bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_SERVICE') private readonly userService: UsersService,
    ){}
    
   async validateUser(username:string,password:string){
    console.log(username,password)
        const userDB=await this.userService.findByUsername(username)
        if(userDB){
            const matched=comparePasswords(password,userDB.password)
                if(matched){
                    console.log('validation Successful')
                    return userDB
                }
                else{
                    console.log('validation Failed')
                    return null
                }
    
            }

        }
        
    }

