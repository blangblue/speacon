import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findOne(email: string): Promise<any> {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async create(data: any): Promise<any> {
        return this.prisma.user.create({
            data,
        });
    }
}
