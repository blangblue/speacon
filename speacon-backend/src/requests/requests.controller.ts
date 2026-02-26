import { Controller, Get, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { JwtAuthGuard } from '../auth/local-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('requests')
export class RequestsController {
    constructor(private readonly requestsService: RequestsService) { }

    // 기업(CLIENT) 대시보드 - 자신이 신청한 내역 보기
    @Roles(Role.CLIENT)
    @Get('client')
    getClientRequests(@Request() req: any) {
        return this.requestsService.getClientRequests(req.user.userId);
    }

    // 기업(CLIENT) - 자신이 신청한 요청 취소
    @Roles(Role.CLIENT)
    @Delete(':id/cancel')
    cancelRequest(@Param('id') id: string, @Request() req: any) {
        return this.requestsService.cancelRequest(id, req.user.userId);
    }

    // 강사(SPEAKER) 대시보드 - 자신에게 들어온 내역 보기
    @Roles(Role.SPEAKER)
    @Get('speaker')
    getSpeakerRequests(@Request() req: any) {
        return this.requestsService.getSpeakerRequests(req.user.userId);
    }

    // 강사(SPEAKER) - 요청 수락/거절 처리
    @Roles(Role.SPEAKER)
    @Patch(':id/respond')
    respondToRequest(
        @Param('id') id: string,
        @Body('status') status: string,
        @Request() req: any,
    ) {
        return this.requestsService.respondToRequest(id, req.user.userId, status);
    }
}
