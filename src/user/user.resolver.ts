import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserEntity } from "./entities/user.entity";
import { UserService } from "./user.service";
import { GetUserArgs } from "./dto/args/get-user.args";
import { RegisterUserInput } from "./dto/input/register-user.input";
import { GetUsersArgs } from "./dto/args/get-users.args";
import { AuthOutput } from "src/common/authentication.output";
import { LoginUserInput } from "./dto/args/login-user.args";

@Resolver(()=>UserEntity)
export class UserResolver{
    constructor( private readonly userService : UserService){}

    @Query(() => [UserEntity])
    async users(
        @Args() getUsersArgs : GetUsersArgs
    ) : Promise<UserEntity[]>{
        return await this.userService.getUsers(getUsersArgs);
    }
    
    @Query(() => UserEntity)
    async user(
        @Args() getUserArgs : GetUserArgs
    ) : Promise<UserEntity>{
        return await this.userService.getUser(getUserArgs);
    }
    @Mutation(() => UserEntity)
    async registerUser(
        @Args('registerUserInput') registerUserInput : RegisterUserInput
    ){
        return await this.userService.register(registerUserInput);
    }

    @Query(() => AuthOutput)
    async login(
        @Args('loginUserInput') loginUserInput : LoginUserInput
    ){
        return await this.userService.login(loginUserInput);
    }
}