import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RequestStatus } from '@prisma/client';

@Injectable()
export class ReviewsService {
    constructor(private prisma: PrismaService) { }

    // 1. 특정 강사의 리뷰 세부 목록 조회
    async getReviewsForSpeaker(speakerId: string) {
        return this.prisma.review.findMany({
            where: { speakerId },
            include: {
                client: { select: { name: true, companyName: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    // 2. 기업(Client)이 특정 강연 요청(Request)에 대해 리뷰 작성
    async createReview(clientId: string, body: { requestId: string; rating: number; content: string }) {
        const { requestId, rating, content } = body;

        // 해당 요청(Request)이 실제로 강연을 마친 상태인지(COMPLETED 혹은 ACCEPTED 여부) 점검
        const request = await this.prisma.request.findUnique({
            where: { id: requestId },
        });

        if (!request) throw new NotFoundException('Request not found');
        if (request.clientId !== clientId) throw new ForbiddenException('You can only review your own requests');

        // 단순화 구현: ACCEPTED 나 COMPLETED 일때만 리뷰 작성 가능하게 하려면 주석 해제
        // if (request.status !== RequestStatus.COMPLETED) {
        //   throw new BadRequestException('Cannot review a request that is not completed');
        // }

        // 기존 리뷰가 있는지 확인
        const existingReview = await this.prisma.review.findUnique({
            where: { requestId },
        });
        if (existingReview) throw new BadRequestException('A review for this request already exists');

        if (!request.targetSpeakerId) {
            throw new BadRequestException('Speaker is missing from this request');
        }

        return this.prisma.review.create({
            data: {
                clientId,
                speakerId: request.targetSpeakerId,
                requestId,
                rating,
                content,
            },
        });
    }
}
