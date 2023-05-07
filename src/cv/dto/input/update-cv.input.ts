import { PartialType } from '@nestjs/mapped-types';
import { CreateCvInput } from './create-cv.input';
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { SkillEntity } from 'src/skill/entities/skill.entity';
@InputType()
export class UpdateCvInput{
    @Field(()=>Int)
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    id : number

    @Field({nullable:true})
    name : string

    @Field({nullable:true})
    firstname : string

    @Field(()=>Int,{nullable:true})
    age : number

    @Field({nullable:true})
    job : string

    @Field({nullable:true})
    cin : string

    @Field({nullable:true})
    path : string

    @Field(()=>[String],{nullable:true})
    skills? : SkillEntity[]
}
