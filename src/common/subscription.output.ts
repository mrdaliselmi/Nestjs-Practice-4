import { Field, Int, ObjectType } from "@nestjs/graphql";
import { CvEntity } from "src/cv/entities/cv.entity";

@ObjectType()
export class SubscriptionOutput extends CvEntity {
    @Field({nullable : true})
    title : string;
    @Field(()=>Int, {nullable : true})
    ok : number;    
}