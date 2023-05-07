import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillEntity } from './entities/skill.entity';
import { Repository } from 'typeorm';
import { GetSkillArgs } from './dto/args/get-skill.args';
import { CreateSkillInput } from './dto/input/create-skill.input';
import { UpdateSkillInput } from './dto/input/update-skill.input';

@Injectable()
export class SkillService {

  constructor(
    @InjectRepository(SkillEntity)
    private skillRepository: Repository<SkillEntity>
  ){}

  async create(createSkillInput: CreateSkillInput) {
    return await this.skillRepository.save(createSkillInput);
  }

  async findAll() {
    return await this.skillRepository.find();
  }

  async findOne(getSkillArgs : GetSkillArgs) {
    const skill = await this.skillRepository.findOne({where : {...getSkillArgs}});
    if(!skill) throw new NotFoundException(`skill of id ${getSkillArgs.id} not found`);
    return skill;  
  }

  async update(updateSkillInput: UpdateSkillInput) {
    const skill = await this.skillRepository.findOne({where : {"id" : updateSkillInput.id}});
    if(!skill) throw new NotFoundException(`skill of id ${updateSkillInput.id} not found`);
    const updatedSkill = await this.skillRepository.update(updateSkillInput.id, updateSkillInput);
    return {...updatedSkill, ...updateSkillInput};
  }


  async remove(getSkillArgs: GetSkillArgs) {
    const skill = await this.skillRepository.findOne({where : {...getSkillArgs}});
    if(!skill) throw new NotFoundException(`skill of id ${getSkillArgs.id} not found`);
    return {...await this.skillRepository.delete(getSkillArgs.id),
    ok: true};
  }
}
