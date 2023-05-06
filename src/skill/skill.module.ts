import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillEntity } from './entities/skill.entity';
import { SkillResolver } from './skill.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([SkillEntity])],
  controllers: [],
  providers: [SkillService, SkillResolver]
})
export class SkillModule {}
