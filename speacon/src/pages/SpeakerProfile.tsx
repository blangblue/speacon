import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSpeakerById, type Speaker } from '../data/mockData';
import './SpeakerProfile.css';

const SpeakerProfile: React.FC = () => {
    const { id } = useParams();
    const [speaker, setSpeaker] = useState<Speaker | null>(null);

    useEffect(() => {
        if (id) {
            const data = getSpeakerById(id);
            setSpeaker(data || null);
        }
    }, [id]);

    if (!speaker) {
        return (
            <div className="profile-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
                <div style={{ textAlign: 'center' }}>
                    <h2>요청하신 강사 정보를 찾을 수 없습니다.</h2>
                    <br />
                    <Link to="/search" className="btn btn-primary">강사 목록으로 돌아가기</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            {/* Profile Header */}
            <div className="profile-header">
                <div className="container profile-header-content">
                    <div
                        className="profile-image-large"
                        style={speaker.imageUrl ? { backgroundImage: `url(${speaker.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                    ></div>
                    <div className="profile-titles">
                        {speaker.isPremium && <span className="badge-premium">프리미엄 인증 강사</span>}
                        <h1 className="profile-name">
                            {speaker.name} <span className="profile-role">| {speaker.role}</span>
                        </h1>
                        <p className="profile-headline">"{speaker.headline}"</p>
                        <div className="profile-stats">
                            <span>⭐ {speaker.rating.toFixed(1)} ({speaker.reviewCount}개의 후기)</span>
                            <span>💼 누적 강연 {speaker.totalLectures}회 이상</span>
                        </div>
                        <div className="profile-tags">
                            {speaker.tags.map(tag => (
                                <span key={tag} className="tag-border">{tag}</span>
                            ))}
                        </div>
                    </div>
                    <div className="profile-actions glass-panel">
                        <p className="price-info">예상 섭외비 <strong>{speaker.priceLabel}</strong></p>
                        <Link to={`/request?speakerId=${speaker.id}`} className="btn btn-primary btn-block">강연 의뢰하기</Link>
                        <button className="btn btn-outline btn-block mt-2">🤍 찜하기</button>
                    </div>
                </div>
            </div>

            {/* Profile Content */}
            <div className="container profile-body">
                <main className="profile-main-content">
                    <section className="profile-section">
                        <h2>강사 소개</h2>
                        <p style={{ whiteSpace: 'pre-line' }}>{speaker.description}</p>
                    </section>

                    <section className="profile-section">
                        <h2>주요 이력</h2>
                        <ul className="timeline">
                            {speaker.timeline.map((item, idx) => (
                                <li key={idx}>
                                    <div className="timeline-date">{item.year}</div>
                                    <div className="timeline-desc">{item.desc}</div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="profile-section">
                        <h2>대표 강연 및 포트폴리오</h2>
                        <div className="portfolio-grid">
                            {speaker.portfolio.map((item, idx) => (
                                <div key={idx} className="video-card" style={item.type === 'pdf' ? { backgroundImage: 'linear-gradient(135deg, #141E30, #243B55)' } : {}}>
                                    <div className="play-btn">{item.type === 'video' ? '▶' : '📄'}</div>
                                    <p>{item.title}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default SpeakerProfile;
