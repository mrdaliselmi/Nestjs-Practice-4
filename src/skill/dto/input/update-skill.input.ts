import { Field, InputType, Int } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { CreateSkillInput } from './create-skill.input';
@InputType()
export class UpdateSkillInput extends PartialType(CreateSkillInput) {
    @Field(()=>Int)
    id : number
}
