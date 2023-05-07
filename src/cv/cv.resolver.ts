import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { DeleteOutput } from "src/common/delete.output";
import { SubscriptionOutput } from "src/common/subscription.output";
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

    // SUBSCRIPTION CV NOTIFICATIONS
    @Subscription(()=>SubscriptionOutput)
    cvNotifications(){
        return this.cvService.AllCvNotifications();
    }

    // SUBSCRIPTION CV ADDED
    @Subscription(()=>SubscriptionOutput)
    cvAdded(){
        return this.cvService.cvAdded();
    }

    // SUBSCRIPTION CV UPDATED
    @Subscription(()=>SubscriptionOutput)
    cvUpdated(){
        return this.cvService.cvUpdated();
    }

    // SUBSCRIPTION CV DELETED
    @Subscription(()=>SubscriptionOutput)
    cvDeleted(){
        return this.cvService.cvDeleted();
    }

}