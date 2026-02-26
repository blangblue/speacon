import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { SpeakersService } from './speakers.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('speakers')
export class SpeakersController {
    constructor(private readonly speakersService: SpeakersService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post('onboarding')
    async createProfile(@Request() req: any, @Body() body: any) {
        // req.user.userId contains the authenticated User ID
        return this.speakersService.createProfile(req.user.userId, body);
    }

    @Get(':id')
    async getProfile(@Param('id') id: string) {
        return this.speakersService.getProfile(id);
    }

    @Get()
    async getAllSpeakers() {
        return this.speakersService.getAllSpeakers();
    }
}
