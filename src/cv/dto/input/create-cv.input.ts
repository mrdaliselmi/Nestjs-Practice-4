import { Field, InputType, Int } from "@nestjs/graphql"
import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator"
@InputType()
export class CreateCvInput {
    @Field(()=>Int)
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    age : number

    @Field()
    @IsString()
    @IsNotEmpty()
    job : string

    @Field()
    @IsString()
    @IsNotEmpty()
    cin : string

    @Field()
    @IsString()
    @IsNotEmpty()
    name : string

    @Field()
    @IsString()
    @IsNotEmpty()
    firstname : string

    @Field()
    @IsString()
    @IsNotEmpty()
    path : string

    @Field(()=>[String],{nullable:true,defaultValue:[]})
    skills?: string[];
}
