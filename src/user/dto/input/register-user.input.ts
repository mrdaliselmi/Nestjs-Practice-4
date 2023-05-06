import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, ValidationArguments } from "class-validator";
import { RequiredFieldErrorMessage } from "src/common/errors";

@InputType()
export class RegisterUserInput {
    @Field()
    @IsNotEmpty(RequiredFieldErrorMessage({targetName: "username"} as ValidationArguments))
    username: string;

    @Field()
    @IsEmail()
    @IsNotEmpty(RequiredFieldErrorMessage({targetName: "email"} as ValidationArguments))
    email: string;

    @Field()
    @IsNotEmpty(RequiredFieldErrorMessage({targetName: "password"} as ValidationArguments))
    password: string;
}