import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, ValidationArguments } from "class-validator";
import { RequiredFieldErrorMessage } from "src/common/errors";

@InputType()
export class LoginUserInput {
    @Field()
    @IsNotEmpty(RequiredFieldErrorMessage({targetName: "username or email"} as ValidationArguments))
    username: string;

    @Field()
    @IsNotEmpty(RequiredFieldErrorMessage({targetName: "password"} as ValidationArguments))
    password: string;
}