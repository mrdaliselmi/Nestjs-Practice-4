import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {CvEntity} from "../../cv/entities/cv.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";
@ObjectType()
@Entity("skill")
export class SkillEntity {
    @Field(()=>Int)
    @PrimaryGeneratedColumn()
    id : number

    @Field()
    @Column()
    designation : string

    @Field(()=>[CvEntity])
    @ManyToMany(
        ()=>CvEntity,
        (cv)=>cv.skills,
    )
    cvs : CvEntity[]


}