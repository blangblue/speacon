import React, { useState } from 'react';
import './Search.css';
import { Link } from 'react-router-dom';
import { mockSpeakers } from '../data/mockData';

const Search: React.FC = () => {
    const [speakers] = useState(mockSpeakers);
    return (
        <div className="search-page">
            <div className="search-header">
                <div className="container">
                    <h1>강사 찾기</h1>
                    <p>분야, 예산, 일정에 맞는 최적의 강사를 필터링해보세요.</p>
                </div>
            </div>

            <div className="container search-body">
                <aside className="search-sidebar glass-panel">
                    <div className="filter-group">
                        <h3>분야</h3>
                        <label><input type="checkbox" /> 리더십/조직문화</label>
                        <label><input type="checkbox" /> IT/디지털(AI, DX 등)</label>
                        <label><input type="checkbox" /> 마케팅/세일즈</label>
                        <label><input type="checkbox" /> 경제/경영</label>
                        <label><input type="checkbox" /> 인문/교양</label>
                    </div>

                    <div className="filter-group">
                        <h3>예산 (1회 기준)</h3>
                        <label><input type="radio" name="budget" /> 50만원 미만</label>
                        <label><input type="radio" name="budget" /> 50~100만원</label>
                        <label><input type="radio" name="budget" /> 100~300만원</label>
                        <label><input type="radio" name="budget" /> 300만원 이상</label>
                        <label><input type="radio" name="budget" /> 협의 (프리미엄)</label>
                    </div>

                    <button className="btn btn-primary btn-block">필터 적용하기</button>
                </aside>

                <main className="search-results">
                    <div className="search-actions">
                        <span>총 <strong>{speakers.length}</strong>명의 마스터가 있습니다.</span>
                        <select className="sort-select">
                            <option>인기순</option>
                            <option>평점 높은 순</option>
                            <option>리뷰 많은 순</option>
                        </select>
                    </div>

                    <div className="speaker-grid">
                        {speakers.map((speaker) => (
                            <Link to={`/speaker/${speaker.id}`} className="speaker-card" key={speaker.id} style={{ display: 'block' }}>
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
                </main>
            </div>
        </div>
    );
};

export default Search;
