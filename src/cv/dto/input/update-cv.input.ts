import { PartialType } from '@nestjs/mapped-types';
import { CreateCvInput } from './create-cv.input';
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
@InputType()
export class UpdateCvInput extends PartialType(CreateCvInput) {
    @Field(()=>Int)
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    id : number
}
