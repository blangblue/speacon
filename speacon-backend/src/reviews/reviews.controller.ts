import { Controller, Get, Post, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from '../auth/local-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) { }

    // 퍼블릭: 특정 강사의 모든 리뷰 열람
    @Get('speaker/:speakerId')
    getSpeakerReviews(@Param('speakerId') speakerId: string) {
        return this.reviewsService.getReviewsForSpeaker(speakerId);
    }

    // 권한(CLIENT): 자신이 연 강연 요청건에 대해 단일 리뷰 등록
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.CLIENT)
    @Post()
    createReview(@Request() req: any, @Body() body: any) {
        return this.reviewsService.createReview(req.user.userId, body);
    }
}
