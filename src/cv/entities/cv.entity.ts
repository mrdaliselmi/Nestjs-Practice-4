import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn ,JoinTable} from "typeorm";
import {UserEntity} from "../../user/entities/user.entity";
import { SkillEntity } from "../../skill/entities/skill.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";
@ObjectType()
@Entity("cv")
export class CvEntity {
    @Field(()=>Int,{nullable:true})
    @PrimaryGeneratedColumn()
    id : number

    @Field({nullable:true})
    @Column()
    name : string

    @Field({nullable:true})
    @Column()
    firstname : string

    @Field(()=>Int,{nullable:true})
    @Column()
    age : number

    @Field({nullable:true})
    @Column()
    job : string

    @Field({nullable:true})
    @Column()
    cin : string

    @Field({nullable:true})
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
        {onDelete : "CASCADE"}
    )
    @JoinTable()
    skills? : SkillEntity[]


}