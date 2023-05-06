import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { UserResolver } from './user.resolver';
import { JwtStrategy } from './strategy/passport-jwt.stategy';

dotenv.config();
@Module({
  imports:[
    TypeOrmModule.forFeature(
        [UserEntity]
      ),
    PassportModule.register({defaultStrategy: 'jwt' },),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { 
        expiresIn: '1d',
      },
    }),
],
  controllers: [],
  providers: [UserService, UserResolver, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
