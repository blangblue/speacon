import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SpeakersService {
    constructor(private prisma: PrismaService) { }

    async createProfile(userId: string, data: any) {
        return this.prisma.speaker.create({
            data: {
                userId,
                roleTitle: data.roleTitle,
                headline: data.headline,
                description: data.description,
                priceRange: data.priceRange,
            },
        });
    }

    async getProfile(speakerId: string) {
        return this.prisma.speaker.findUnique({
            where: { id: speakerId },
            include: {
                user: {
                    select: { name: true, companyName: true }
                }
            }
        });
    }

    async getAllSpeakers() {
        return this.prisma.speaker.findMany({
            include: {
                user: { select: { name: true } }
            }
        });
    }
}
