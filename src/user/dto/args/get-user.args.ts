import { ArgsType, Field, Int } from "@nestjs/graphql";
import { IsNotEmpty, ValidationArguments } from "class-validator";
import { RequiredFieldErrorMessage } from "src/common/errors";

@ArgsType()
export class GetUserArgs {

    @Field(()=>Int)
    @IsNotEmpty(RequiredFieldErrorMessage({targetName : "id"} as ValidationArguments))
    id: number;
}