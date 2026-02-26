import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RequestStatus, Role } from '@prisma/client';

@Injectable()
export class RequestsService {
    constructor(private prisma: PrismaService) { }

    // 1. 기업이 작성한 요청서 목록 조회 (Client Dashboard)
    async getClientRequests(clientId: string) {
        return this.prisma.request.findMany({
            where: { clientId },
            include: {
                targetSpeaker: {
                    include: {
                        user: { select: { name: true } },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    // 2. 강사 본인에게 수신된 요청서 목록 조회 (Speaker Dashboard)
    async getSpeakerRequests(userId: string) {
        // Speaker ID 획득
        const speaker = await this.prisma.speaker.findUnique({ where: { userId } });
        if (!speaker) throw new NotFoundException('Speaker profile not found');

        return this.prisma.request.findMany({
            where: { targetSpeakerId: speaker.id },
            include: {
                client: { select: { name: true, companyName: true, email: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    // 3. 기업: 요청서 작성 시점에서의 취소 기능 (PENDING 상태일 때만)
    async cancelRequest(requestId: string, clientId: string) {
        const request = await this.prisma.request.findUnique({ where: { id: requestId } });
        if (!request) throw new NotFoundException('Request not found');
        if (request.clientId !== clientId) throw new ForbiddenException('Not your request');
        if (request.status !== RequestStatus.PENDING) {
            throw new ForbiddenException('Cannot cancel request in current status');
        }

        // 상태를 CANCELLED(또는 REJECTED)로 변경 혹은 DB에서 영구 삭제
        return this.prisma.request.delete({
            where: { id: requestId }
        });
    }

    // 4. 강사: 요청 수락/거절 업데이트
    async respondToRequest(requestId: string, userId: string, statusStr: string) {
        const speaker = await this.prisma.speaker.findUnique({ where: { userId } });
        if (!speaker) throw new NotFoundException('Speaker profile not found');

        const request = await this.prisma.request.findUnique({ where: { id: requestId } });
        if (!request) throw new NotFoundException('Request not found');
        if (request.targetSpeakerId !== speaker.id) throw new ForbiddenException('Not your request');

        const status = statusStr as RequestStatus;
        return this.prisma.request.update({
            where: { id: requestId },
            data: { status },
        });
    }
}
