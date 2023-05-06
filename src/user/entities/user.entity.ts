import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Time } from '../../common/time';
import { UserRole } from "../../common/user-role.enum";
import { CvEntity } from "../../cv/entities/cv.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@ObjectType()
@Entity('user')
export class UserEntity extends Time {
    @Field(()=>Int)
    @PrimaryGeneratedColumn()
    id : number; 

    @Field()
    @Column({
        length: 50,
        unique: true,
    })
    username : string;

    @Field()
    @Column({
        unique: true,
    })
    email : string;

    @Field()
    @Column()
    password : string;

    @Field()
    @Column()
    salt : string;

    @Field()
    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role : string;

    @Field(()=>[CvEntity])
    @OneToMany(
        ()=>CvEntity,
        (cv)=> cv.user
    )
    cvs : CvEntity[]
}
