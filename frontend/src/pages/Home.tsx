import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockSpeakers, getTrendingKeywords, type Speaker } from '../data/mockData';
import './Home.css';

const Home: React.FC = () => {
    const [trendingKeywords, setTrendingKeywords] = useState<string[]>([]);
    const [recommendedSpeakers, setRecommendedSpeakers] = useState<Speaker[]>([]);

    useEffect(() => {
        setTrendingKeywords(getTrendingKeywords());
        setRecommendedSpeakers(mockSpeakers.slice(0, 3));
    }, []);
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container hero-container">
                    <div className="hero-content">
                        <span className="badge">B2B 강연 매칭 플랫폼</span>
                        <h1 className="hero-title">
                            세상의 모든 인사이트,<br />
                            <span className="highlight">가장 빠르게 연결합니다.</span>
                        </h1>
                        <p className="hero-subtitle">
                            IT 트렌드, 리더십, 마케팅까지. 당신의 비즈니스에 영감을 더할<br />
                            최고의 실무 전문가를 스피콘에서 만나보세요.
                        </p>

                        <div className="search-box glass-panel">
                            <input
                                type="text"
                                className="search-input"
                                placeholder="어떤 분야의 전문가를 찾으시나요? (ex. AI 트렌드, 조직 문화)"
                            />
                            <Link to="/search" className="btn btn-primary search-btn" style={{ display: 'flex', alignItems: 'center' }}>검색</Link>
                        </div>

                        <div className="trending-tags">
                            <span className="tag-label">추천 키워드 :</span>
                            {trendingKeywords.map(keyword => (
                                <Link to="/search" key={keyword} className="tag">{keyword}</Link>
                            ))}
                        </div>
                    </div>
                    <div className="hero-graphics">
                        {/* Abstract modern graphic placeholder */}
                        <div className="floating-card top-right glass-panel">
                            <div className="icon">🚀</div>
                            <div>
                                <h4>1,000+</h4>
                                <p>등록된 마스터</p>
                            </div>
                        </div>
                        <div className="floating-card bottom-left glass-panel">
                            <div className="icon">🤝</div>
                            <div>
                                <h4>성공적인</h4>
                                <p>매칭 완료</p>
                            </div>
                        </div>
                        <div className="abstract-shape shape-1"></div>
                        <div className="abstract-shape shape-2"></div>
                    </div>
                </div>
            </section>

            {/* Popular Categories / Recommended Section to follow... */}
            <section className="recommended-section">
                <div className="container">
                    <h2 className="section-title">스피콘 추천 마스터</h2>
                    <p className="section-desc">지금 기업들이 가장 많이 찾는 인사이트 리더</p>

                    <div className="speaker-grid">
                        {recommendedSpeakers.map(speaker => (
                            <Link to={`/speaker/${speaker.id}`} key={speaker.id} className="speaker-card" style={{ display: 'block' }}>
                                <div
                                    className="speaker-image"
                                    style={speaker.imageUrl ? { backgroundImage: `url(${speaker.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' } : { position: 'relative' }}
                                >
                                    {speaker.isPremium && <span style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.6)', color: '#D4AF37', padding: '4px 8px', borderRadius: 4, fontSize: 12, fontWeight: 700 }}>PREMIUM</span>}
                                </div>
                                <div className="speaker-info">
                                    <div className="speaker-header">
                                        <h3 style={{ color: 'var(--color-text-main)' }}>{speaker.name}</h3>
                                        <span className="rating">⭐ {speaker.rating.toFixed(1)} ({speaker.reviewCount})</span>
                                    </div>
                                    <p className="speaker-role">{speaker.role}</p>
                                    <div className="speaker-tags">
                                        {speaker.tags.map(tag => (
                                            <span key={tag} className="tag-sm">{tag}</span>
                                        ))}
                                    </div>
                                    <div className="speaker-footer">
                                        <span className="price">{speaker.priceLabel}</span>
                                        <span className="btn-text">프로필 보기 &rarr;</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
