import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class DeleteOutput {
    @Field(()=>Int, {nullable : true})
    ok : number;
}