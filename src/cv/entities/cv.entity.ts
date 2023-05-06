import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn ,JoinTable} from "typeorm";
import {UserEntity} from "../../user/entities/user.entity";
import { SkillEntity } from "../../skill/entities/skill.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";
@ObjectType()
@Entity("cv")
export class CvEntity {
    @Field(()=>Int)
    @PrimaryGeneratedColumn()
    id : number

    @Field()
    @Column()
    name : string

    @Field()
    @Column()
    firstname : string

    @Field(()=>Int)
    @Column()
    age : number

    @Field()
    @Column()
    job : string

    @Field()
    @Column()
    cin : string

    @Field()
    @Column()
    path : string

    @Field(()=>UserEntity,{nullable:true})
    @ManyToOne(
        ()=>UserEntity,
        (user)=>user.cvs,
        {
            eager : true
        }
    )
    user : UserEntity

    @Field(()=>[SkillEntity],{nullable:true})
    @ManyToMany(
        ()=>SkillEntity,
        (skill)=>skill.cvs,
        // {
        //     cascade : true
        // }
    )
    @JoinTable()
    skills? : SkillEntity[]


}