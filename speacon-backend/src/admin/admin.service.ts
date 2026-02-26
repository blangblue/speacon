import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Grade, PaymentStatus, RequestStatus, Role } from '@prisma/client';

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) { }

    // 1. 회원 통합 관리 (강사/기업/어드민)
    async getAllUsers() {
        return this.prisma.user.findMany({
            include: {
                speaker: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    // 1-1. 강사 등급 수동 조절
    async updateSpeakerGrade(speakerId: string, gradeStr: string) {
        const grade = gradeStr as Grade;
        const speaker = await this.prisma.speaker.findUnique({ where: { id: speakerId } });
        if (!speaker) throw new NotFoundException('Speaker not found');

        return this.prisma.speaker.update({
            where: { id: speakerId },
            data: { grade },
        });
    }

    // 2. 전체 강연 요청 관리 (매칭 현황 및 수수료)
    async getAllRequests() {
        return this.prisma.request.findMany({
            include: {
                client: { select: { id: true, name: true, companyName: true } },
                targetSpeaker: {
                    include: {
                        user: { select: { name: true, email: true } },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    // 2-1. 특정 강연 요청 수수료/결제 상태 업데이트
    async updateRequestPaymentStatus(requestId: string, statusStr: string, feeAmount?: number) {
        const request = await this.prisma.request.findUnique({ where: { id: requestId } });
        if (!request) throw new NotFoundException('Request not found');

        const paymentStatus = statusStr as PaymentStatus;
        const updateData: any = { paymentStatus };
        if (feeAmount !== undefined) {
            updateData.feeAmount = feeAmount;
        }

        return this.prisma.request.update({
            where: { id: requestId },
            data: updateData,
        });
    }

    // 2-2. 강제 요청 상태 변경 (어드민 대응용)
    async updateRequestStatus(requestId: string, statusStr: string) {
        const status = statusStr as RequestStatus;
        return this.prisma.request.update({
            where: { id: requestId },
            data: { status },
        });
    }

    // 3. 리뷰 통합 조회 및 관리
    async getAllReviews() {
        return this.prisma.review.findMany({
            include: {
                client: { select: { name: true, companyName: true } },
                speaker: {
                    include: {
                        user: { select: { name: true } },
                    },
                },
                request: { select: { eventDate: true, eventLocation: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
}
