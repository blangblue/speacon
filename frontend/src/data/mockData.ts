// Type definitions for Mock Data
export interface Speaker {
    id: string;
    name: string;
    role: string;
    category: string[];
    tags: string[];
    rating: number;
    reviewCount: number;
    priceAmount: number; // 0 means '협의'
    priceLabel: string;
    imageUrl?: string;
    isPremium: boolean;
    headline: string;
    totalLectures: number;
    description: string;
    timeline: { year: string; desc: string }[];
    portfolio: { title: string; type: 'video' | 'pdf' }[];
}

// Mock Data
export const mockSpeakers: Speaker[] = [
    {
        id: "spk_001",
        name: "김 AI",
        role: "A사 Chief AI Officer",
        category: ["IT/디지털", "리더십/조직문화"],
        tags: ["#AI트렌드", "#DX전략", "#기업혁신"],
        rating: 4.9,
        reviewCount: 124,
        priceAmount: 0,
        priceLabel: "협의",
        imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256&h=256",
        isPremium: true,
        headline: "생성형 AI 시대, 비즈니스 패러다임의 전환을 이야기합니다.",
        totalLectures: 215,
        description: "현재 국내 시총 상위 A사에서 AI 전략을 총괄하고 있으며, 과거 B스타트업을 창업하여 성공적으로 엑싯한 경험이 있습니다. 현업에서 겪은 생생한 사례를 바탕으로 기술이 어떻게 실제 비즈니스 가치로 연결되는지 명확하게 전달합니다.",
        timeline: [
            { year: "2020 - 현재", desc: "A사 최고AI책임자(CAIO)" },
            { year: "2016 - 2020", desc: "B스타트업 창업 및 대표이사 (M&A 엑시트)" },
            { year: "2010 - 2016", desc: "글로벌 컨설팅 T사 수석 컨설턴트" }
        ],
        portfolio: [
            { title: "[2023 글로벌 포럼] 생성형 AI가 바꾸는 일하는 방식", type: "video" },
            { title: "초격차 기업의 디지털 트랜스포메이션 전략 로드맵", type: "pdf" }
        ]
    },
    {
        id: "spk_002",
        name: "이 마켓",
        role: "스타트업 G사 CMO",
        category: ["마케팅/세일즈"],
        tags: ["#그로스해킹", "#퍼포먼스마케팅", "#브랜딩"],
        rating: 4.8,
        reviewCount: 85,
        priceAmount: 1500000,
        priceLabel: "150만원 ~",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256&h=256",
        isPremium: false,
        headline: "돈을 쓰지 않고도 돈을 버는 마케팅, 그로스 해킹의 모든 것",
        totalLectures: 98,
        description: "퍼포먼스 마케팅의 한계를 넘어 제품 자체의 성장을 이끄는 그로스 해킹 전문가입니다. 초기 스타트업부터 중견 기업까지 다양한 규모의 조직에서 마케팅 효율을 극대화한 실전 노하우를 공유합니다.",
        timeline: [
            { year: "2021 - 현재", desc: "G사 최고마케팅책임자(CMO)" },
            { year: "2018 - 2021", desc: "U플랫폼 퍼포먼스 마케팅 팀장" }
        ],
        portfolio: [
            { title: "스타트업 J커브를 그리는 데이터 기반 마케팅", type: "video" }
        ]
    },
    {
        id: "spk_003",
        name: "박 리더",
        role: "C기업 인사총괄 전무",
        category: ["리더십/조직문화"],
        tags: ["#애자일", "#성과관리", "#밀레니얼리더십"],
        rating: 5.0,
        reviewCount: 42,
        priceAmount: 2000000,
        priceLabel: "200만원 ~",
        imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=256&h=256",
        isPremium: true,
        headline: "90년생과 일하는 법? 핵심은 소통이 아닌 '시스템'입니다.",
        totalLectures: 150,
        description: "대기업과 유니콘 스타트업을 모두 거치며 다양한 형태의 조직 문화를 심층적으로 연구해왔습니다. 말로만 하는 혁신이 아닌, 평가/보상/피드백 시스템의 변화를 통한 실질적인 조직 행동 변화를 이끌어냅니다.",
        timeline: [
            { year: "2019 - 현재", desc: "C기업 인사총괄 전무 (CHRO)" },
            { year: "2012 - 2018", desc: "D그룹 HR혁신실장" }
        ],
        portfolio: [
            { title: "애자일 조직이 실패하는 3가지 이유", type: "video" },
            { title: "상시 성과관리 체계 구축 가이드", type: "pdf" }
        ]
    },
    {
        id: "spk_004",
        name: "최 경제",
        role: "베스트셀러 작가 및 거시경제 애널리스트",
        category: ["경제/경영"],
        tags: ["#거시경제", "#투자전략", "#2025트렌드"],
        rating: 4.7,
        reviewCount: 205,
        priceAmount: 0,
        priceLabel: "협의",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256&h=256",
        isPremium: true,
        headline: "불확실성의 시대, 데이터로 읽는 경제의 미래",
        totalLectures: 350,
        description: "복잡한 글로벌 경제 이슈를 대중의 눈높이에 맞춰 쉽고 명쾌하게 풀어냅니다. 기업의 경영 전략 수립을 위한 거시적 인사이트 제공에 특화되어 있습니다.",
        timeline: [
            { year: "2015 - 현재", desc: "N경제연구소 수석 연구원" },
            { year: "2023", desc: "베스트셀러 '데이터 경제학' 출간" }
        ],
        portfolio: [
            { title: "2024 하반기 글로벌 경제 전망", type: "video" }
        ]
    }
];

// Helper functions for mock filtering (to simulate API)
export const getTrendingKeywords = () => ["#생성형AI", "#B2B영업", "#리더십", "#스타트업조직문화"];

export const getSpeakersByCategory = (category: string) =>
    mockSpeakers.filter(s => s.category.includes(category));

export const getSpeakerById = (id: string) =>
    mockSpeakers.find(s => s.id === id);
