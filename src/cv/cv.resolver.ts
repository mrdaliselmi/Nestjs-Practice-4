import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { DeleteOutput } from "src/common/delete.output";
import { CvService } from "src/cv/cv.service";
import { GetCvArgs } from "src/cv/dto/args/get-cv.args";
import { CreateCvInput } from "src/cv/dto/input/create-cv.input";
import { UpdateCvInput } from "src/cv/dto/input/update-cv.input";
import { CvEntity } from "src/cv/entities/cv.entity";
import { User } from "src/decorators/user.decorator";
import { JwtAuthGuard } from "src/user/Guards/jwt-auth.guard";

@Resolver(()=>CvEntity)
export class CvResolver{
    constructor(private readonly cvService : CvService){}
   
    // GET ALL CVs
    @UseGuards(JwtAuthGuard)
    @Query(() => [CvEntity])
    async cvs(
        @User() user
    ){
        console.log("user",user);
        return await this.cvService.findAll(user);
    }
    // GET ONE CV
    @UseGuards(JwtAuthGuard)
    @Query(() => CvEntity)
    async cv(
        @Args() getCvArgs : GetCvArgs,
        @User() user
    ){
        return await this.cvService.findOne(getCvArgs,user);
    }
    // CREATE CV
    @UseGuards(JwtAuthGuard)
    @Mutation(()=>CvEntity)
    async createCv(
        @Args('createCvInput') createCvInput : CreateCvInput,
        @User() user
    ){
        return await this.cvService.create(createCvInput, user);
    }

    // UPDATE CV
    @UseGuards(JwtAuthGuard)
    @Mutation(()=>CvEntity)
    async updateCv(
        @Args('updateCvInput') updateCvInput : UpdateCvInput,
        @User() user
    ){
        return await this.cvService.update(updateCvInput, user);
    }

    // DELETE CV
    @UseGuards(JwtAuthGuard)
    @Mutation(()=>DeleteOutput)
    async deleteCv(
        @Args() getCvArgs : GetCvArgs,
        @User() user
    ){
        return await this.cvService.remove(getCvArgs, user);
    }

}