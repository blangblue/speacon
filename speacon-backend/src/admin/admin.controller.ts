import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/local-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN) // 운영자만 접근 가능
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    // 1. 유저 (강사/기업) 전체 조회
    @Get('users')
    getAllUsers() {
        return this.adminService.getAllUsers();
    }

    // 강사 스펙(등급) 수정
    @Patch('speakers/:id/grade')
    updateSpeakerGrade(@Param('id') id: string, @Body('grade') grade: string) {
        return this.adminService.updateSpeakerGrade(id, grade);
    }

    // 2. 전체 강연 요청 모니터링
    @Get('requests')
    getAllRequests() {
        return this.adminService.getAllRequests();
    }

    // 강연 매칭 수수료 및 결제 상태 변경
    @Patch('requests/:id/payment')
    updateRequestPaymentStatus(
        @Param('id') id: string,
        @Body('paymentStatus') paymentStatus: string,
        @Body('feeAmount') feeAmount?: number,
    ) {
        return this.adminService.updateRequestPaymentStatus(id, paymentStatus, feeAmount);
    }

    // 강연 매칭 진행 상태 수동 변경 (어드민 백업용)
    @Patch('requests/:id/status')
    updateRequestStatus(@Param('id') id: string, @Body('status') status: string) {
        return this.adminService.updateRequestStatus(id, status);
    }

    // 3. 플랫폼 전체 리뷰(후기) 관리
    @Get('reviews')
    getAllReviews() {
        return this.adminService.getAllReviews();
    }
}
