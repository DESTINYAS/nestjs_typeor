import { Inject, Injectable } from "@nestjs/common/decorators";
import { UnauthorizedException } from "@nestjs/common/exceptions";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "src/auth/services/auth/auth.service";

@Injectable()
export class localStrategy extends PassportStrategy(Strategy){
    constructor(@Inject('AUTH_SERVICE')private readonly authService:AuthService){
        super()
    }
    async validate(username:string,password:string){
        console.log("InsideLocalStrategy")
        console.log(username)
        console.log(password)

      const user=await  this.authService.validateUser(username,password)
      if(!user){
        throw new UnauthorizedException()
      }
      return user
    }
} 