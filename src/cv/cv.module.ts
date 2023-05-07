import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvEntity } from './entities/cv.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillEntity } from '../skill/entities/skill.entity';
import { UserEntity } from '../user/entities/user.entity';
import { CvResolver } from 'src/cv/cv.resolver';
import { UserModule } from 'src/user/user.module';
import { PubSub } from 'graphql-subscriptions';

@Module({
  imports: [
    TypeOrmModule.forFeature([CvEntity, SkillEntity, UserEntity]),
    UserModule,
  ],
  controllers: [],
  providers: [
    CvService,
    CvResolver,     
    {
    provide: 'PUB_SUB',
    useValue: new PubSub(),
    },
]
})
export class CvModule {}
