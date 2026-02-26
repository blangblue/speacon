import { PrismaClient, Role, Grade, PortfolioType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('테스트 계정 생성을 시작합니다...');

    // 비밀번호 '1234' 해싱 (10 salt rounds)
    const hashedPassword = await bcrypt.hash('1234', 10);

    // 1. 기업 (Client) 계정 생성
    const clientUser = await prisma.user.upsert({
        where: { email: 'company@speacon.com' },
        update: {},
        create: {
            email: 'company@speacon.com',
            password: hashedPassword,
            name: '김담당 (인사팀)',
            companyName: '유니콘스타트업(주)',
            phone: '010-1234-5678',
            role: Role.CLIENT,
        }
    });
    console.log(`✓ 기업 계정 생성 완료 (ID: ${clientUser.email}) - ${clientUser.companyName}`);

    // 태그를 위한 더미 데이터 생성 시도
    const tag1 = await prisma.tag.upsert({ where: { name: 'IT/Tech' }, update: {}, create: { name: 'IT/Tech' } });
    const tag2 = await prisma.tag.upsert({ where: { name: '스타트업' }, update: {}, create: { name: '스타트업' } });

    // 2. 강사 (Speaker) 계정 생성
    const speakerUser = await prisma.user.upsert({
        where: { email: 'tutor@speacon.com' },
        update: {},
        create: {
            email: 'tutor@speacon.com',
            password: hashedPassword,
            name: '박수석 (개발팀장)',
            companyName: '테크코리아(주)',
            phone: '010-9876-5432',
            role: Role.SPEAKER,
            speaker: {
                create: {
                    roleTitle: '테크코리아(주) 시니어 개발팀장',
                    headline: 'AI 시대에 살아남는 개발 조직 구축 가이드',
                    description: '과거 네카라쿠배 주요 IT 플랫폼에서 대형 트래픽을 처리하며 쌓은 노하우를 공유합니다. 시니어 개발자를 꿈꾸는 분들을 위한 현실적인 커리어 패스를 제시합니다.',
                    priceRange: '200만원 ~ 300만원',
                    profileImageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256&h=256',
                    isPremium: true,
                    totalLectures: 45,
                    grade: Grade.PREMIUM,
                    tags: {
                        create: [
                            { tagId: tag1.id },
                            { tagId: tag2.id }
                        ]
                    },
                    portfolios: {
                        create: [
                            { type: PortfolioType.VIDEO, title: '2023 개발자 컨퍼런스 키노트', mediaUrl: 'https://youtube.com', year: '2023' }
                        ]
                    }
                }
            }
        }
    });
    console.log(`✓ 강사 계정 생성 완료 (ID: ${speakerUser.email}) - ${speakerUser.name}`);

    // 3. 운영자 (Admin) 계정 생성
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@speacon.com' },
        update: {},
        create: {
            email: 'admin@speacon.com',
            password: hashedPassword,
            name: '시스템 관리자',
            companyName: '스피콘운영본부',
            phone: '1588-0000',
            role: Role.ADMIN,
        }
    });
    console.log(`✓ 운영자 계정 생성 완료 (ID: ${adminUser.email})`);

    console.log('\n=======================================');
    console.log('✅ 모든 더미 계정 생성이 완료되었습니다.');
    console.log('초기 비밀번호는 모두 [1234] 입니다.');
    console.log('=======================================');
}

main()
    .catch((e) => {
        console.error('계정 생성 중 에러가 발생했습니다:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
