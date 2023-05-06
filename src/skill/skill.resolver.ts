import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { SkillEntity } from "./entities/skill.entity";
import { SkillService } from "./skill.service";
import { GetSkillArgs } from "./dto/args/get-skill.args";
import { CreateSkillInput } from "./dto/input/create-skill.input";
import { UpdateSkillInput } from "./dto/input/update-skill.input";
import { DeleteResult } from "typeorm";
import { DeleteOutput } from "src/common/delete.output";

@Resolver(()=>SkillEntity)
export class SkillResolver{
    constructor (
        private readonly skillService : SkillService
    ){}

    @Query(()=>[SkillEntity])
    async skills(){
        return await this.skillService.findAll();
    }
    @Query(()=>SkillEntity)
    async skill(
        @Args() getSkillArgs : GetSkillArgs
    ){
        return await this.skillService.findOne(getSkillArgs);
    }

    @Mutation(()=>SkillEntity)
    async createSkill(
        @Args("createSkillInput") createSkillInput : CreateSkillInput)
    {
        return await this.skillService.create(createSkillInput);
    } 

    @Mutation(()=>SkillEntity)
    async updateSkill(
        @Args("updateSkillInput") UpdateSkillInput : UpdateSkillInput)
    {
        return await this.skillService.update(UpdateSkillInput);
    }

    @Mutation(()=>DeleteOutput)
    async deleteSkill(
        @Args() getSkillArgs : GetSkillArgs
    ){
        return await this.skillService.remove(getSkillArgs);
    }

}