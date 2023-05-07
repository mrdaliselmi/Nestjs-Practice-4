import { Field, Int, ObjectType } from "@nestjs/graphql";
import { SkillEntity } from "src/skill/entities/skill.entity";
import { UserEntity } from "src/user/entities/user.entity";

@ObjectType()
export class SubscriptionOutput {

    @Field({nullable : true})
    title : string;

    @Field(()=>Int, {nullable : true})
    ok : number;

    @Field(()=>Int,{nullable:true})
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

    @Field(()=>UserEntity,{nullable:true})
    user : UserEntity

    @Field(()=>[SkillEntity],{nullable:true, defaultValue : []})
    skills : SkillEntity[]
}