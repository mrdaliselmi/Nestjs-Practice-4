import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entities/user.entity';
import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';
import { SkillEntity } from './skill/entities/skill.entity';
import { CvEntity } from './cv/entities/cv.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { JwtStrategy } from './user/strategy/passport-jwt.stategy';

dotenv.config();
@Module({
  imports: [CommonModule, UserModule, 
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserEntity, SkillEntity, CvEntity],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      installSubscriptionHandlers: true,
    })
    ,
    CvModule,
    SkillModule,
    UserModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}