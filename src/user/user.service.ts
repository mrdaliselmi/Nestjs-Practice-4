import { ConflictException, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserInput } from './dto/input/register-user.input';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { LoginUserInput } from './dto/args/login-user.args';
import { UserRole } from 'src/common/user-role.enum';

@Injectable()
export class UserService {
    
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository : Repository<UserEntity>,
        private jwtService : JwtService
    ) {}
        
    async getUser(getUserArgs: GetUserArgs): Promise<UserEntity> {
        return await this.userRepository.findOne({where:{...getUserArgs}, relations: ['cvs']});
    }
    async register(userData : RegisterUserInput): Promise<UserEntity> {
        const user = this.userRepository.create({...userData});
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(userData.password, user.salt);
        try {
            await this.userRepository.save(user);
        }
        catch (error) {
            throw new ConflictException('Username or email already exists');
        }
        // return{id: user.id, username: user.username, email: user.email, role: user.role};
        return(user);
    }

    async login(credentials : LoginUserInput) {

        const {username, password} = credentials;
        const user = await this.userRepository.createQueryBuilder('user')
        .where('user.username = :username or user.email = :username', {username})
        .getOne();
        if(!user) {
            throw new ConflictException('Invalid credentials');
        }
        const hashedPassword = await bcrypt.hash(password, user.salt);
        if(hashedPassword !== user.password) {
            throw new ConflictException('Invalid credentials');
        }
        const payload = { id : user.id , username: user.username, email: user.email, role: user.role};
        const token = this.jwtService.sign(payload);
        return {access_token: token};
    }

    async findUserById(id: number) : Promise<UserEntity>{
        return await this.userRepository.findOneBy({id});
    }

    async getUsers(getUsersArgs: GetUsersArgs){
        return await this.userRepository.find({where: {id: In(getUsersArgs.ids)}, relations: ['cvs']});
    }

    isOwnerOrAdmin(object: any, user: UserEntity){
        return (object.user && object.user.id === user.id || user.role === UserRole.ADMIN);
    }
}
