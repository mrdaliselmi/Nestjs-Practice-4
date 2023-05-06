import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class DeleteOutput {
    @Field(()=>Int)
    affected : number;
    @Field(()=>Boolean)
    ok : boolean;
}