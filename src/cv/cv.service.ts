import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SkillEntity } from '../skill/entities/skill.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CvEntity } from './entities/cv.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { GetCvArgs } from './dto/args/get-cv.args';
import { CreateCvInput } from './dto/input/create-cv.input';
import { UpdateCvInput } from './dto/input/update-cv.input';
import { UserService } from 'src/user/user.service';
import { UserRole } from 'src/common/user-role.enum';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();
@Injectable()
export class CvService {
  constructor(
    @InjectRepository(CvEntity)
    private cvRepository: Repository<CvEntity>,
    @InjectRepository(SkillEntity)
    private skillRepository: Repository<SkillEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly userService: UserService,
    ) {}
    
    cvAdded() {
      return pubSub.asyncIterator('cvAdded');
    }

    async create(createCvInput: CreateCvInput, user : UserEntity) : Promise<CvEntity>{
      const {skills, ...cvData} = createCvInput;
      const cv = this.cvRepository.create(cvData);
    cv.skills = [];
    for (const skill of createCvInput.skills) {
      const skillEntity = await this.skillRepository.findOne({
        where: {
          designation: skill,
        },
      });
      if (skillEntity) {
        cv.skills.push(skillEntity);
      } else {
        const newSkill = this.skillRepository.create();
        newSkill.designation = skill;
        await this.skillRepository.save(newSkill);
        cv.skills.push(newSkill);
      }
    }
    cv.user = user;
    const addedCV =  await this.cvRepository.save(cv);
    pubSub.publish('cvAdded', { cvAdded: addedCV });
    return addedCV;
  }

  
  
  async findAll(user: UserEntity) {
    if (user.role === UserRole.ADMIN) {
    return await this.cvRepository.find({
      relations: ['skills'],
    })
    };
  }
  
  
  async findOne(getCvArgs : GetCvArgs, user: UserEntity) {
    const cv = await this.cvRepository.findOne({
      where: {
        ...getCvArgs
      },
      relations: ['skills'],
    });
    if (this.userService.isOwnerOrAdmin(cv, user)) {
      return cv;
    }
  }

  
  async update(updateCvInput: UpdateCvInput, user : UserEntity){
    const cv = await this.cvRepository.findOne( {where : {id : updateCvInput.id}});
    if (!cv) {
      throw new NotFoundException(`CV with id ${updateCvInput.id} not found`);
    }else{
      if (!this.userService.isOwnerOrAdmin(cv, user)) {
        const updatedCv =  Object.assign(cv, updateCvInput);
        return await this.cvRepository.save(updatedCv);
      }
    }
  }
  
  async remove(getCvArgs : GetCvArgs, user: UserEntity){
    const cv = await this.cvRepository.findOne({
      where: {
        ...getCvArgs
      },
      relations: ['skills', 'user'],
    });
    if (!cv) {
      throw new NotFoundException(`CV with id ${getCvArgs.id} not found`);
    }else{
      if (!this.userService.isOwnerOrAdmin(cv, user)) {
        return {
          ...await this.cvRepository.remove(cv),
          ok : true
        };
      }
    }
  }
  
  async getAllCvsByUserIdByid(cvId: number, userId: any) {
    const queryBuilder = this.cvRepository.createQueryBuilder('cv');
    queryBuilder
    .leftJoinAndSelect('cv.skills', 'skill')
    .innerJoin('cv.user', 'user')
      .where('user.id = :userId', { userId })
      .andWhere('cv.id = :cvId', { cvId });
      const count =await queryBuilder.getCount();
    if (count === 0) {
      throw new NotFoundException('Cv not found');
    }
    return await queryBuilder.getOne();
  }
  async getAllCvsByUserId(userId: string): Promise<CvEntity[]> {
    const queryBuilder = this.cvRepository.createQueryBuilder('cv');
    queryBuilder
    .leftJoinAndSelect('cv.skills', 'skill')
    .innerJoin('cv.user', 'user')
      .where('user.id = :userId', { userId });
  
    return await queryBuilder.getMany();
  }
  
  async createUsingCv(cv: CvEntity, user: UserEntity) {
    cv.user = user;
    return await this.cvRepository.save(cv);
  }
}
