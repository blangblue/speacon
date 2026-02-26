import React, { useState } from 'react';
import { mockSpeakers, mockRequests, mockReviews } from '../data/mockData';
import './AdminDashboard.css';

type ActiveView = 'speakers' | 'requests' | 'reviews' | null;

const AdminDashboard: React.FC = () => {
    const [activeView, setActiveView] = useState<ActiveView>(null);

    // 필터링 상태
    const [searchSpeakerKeyword, setSearchSpeakerKeyword] = useState('');
    const [searchRequestKeyword, setSearchRequestKeyword] = useState('');
    const [filterRequestStatus, setFilterRequestStatus] = useState('ALL');
    const [searchReviewKeyword, setSearchReviewKeyword] = useState('');
    const [filterReviewRating, setFilterRating] = useState('ALL');

    const speakersCount = mockSpeakers.length;
    const premiumSpeakersCount = mockSpeakers.filter(s => s.isPremium).length;
    const pendingRequestsCount = mockRequests.filter(r => r.status === 'PENDING').length;
    const completedRequestsCount = mockRequests.filter(r => r.status === 'COMPLETED').length;
    const totalReviews = mockReviews.length;

    // 데이터 필터링 로직
    const filteredSpeakers = mockSpeakers.filter(s =>
        s.name.includes(searchSpeakerKeyword) || s.category.some(c => c.includes(searchSpeakerKeyword))
    );

    const filteredRequests = mockRequests.filter(r => {
        const matchKeyword = r.clientName.includes(searchRequestKeyword) || r.id.toLowerCase().includes(searchRequestKeyword.toLowerCase());
        const matchStatus = filterRequestStatus === 'ALL' || r.status === filterRequestStatus;
        return matchKeyword && matchStatus;
    });

    const filteredReviews = mockReviews.filter(rev => {
        const targetSpeaker = mockSpeakers.find(s => s.id === rev.speakerId);
        const speakerName = targetSpeaker?.name || '알수없음';
        const matchKeyword = rev.clientName.includes(searchReviewKeyword) || speakerName.includes(searchReviewKeyword);
        let matchRating = true;
        if (filterReviewRating === 'HIGH') matchRating = rev.rating >= 4;
        if (filterReviewRating === 'LOW') matchRating = rev.rating <= 3;
        return matchKeyword && matchRating;
    });

    return (
        <div className="dashboard-container">
            <div className="container">
                <h1 className="dashboard-title">관리자 대시보드</h1>
                <p className="dashboard-subtitle">전체 회원 및 강연 요청 현황을 관리합니다.</p>

                <div className="dashboard-grid">
                    {/* 회원 관리 섹션 */}
                    <div className="dashboard-card glass-panel">
                        <h3>통합 회원 관리</h3>
                        <p>플랫폼에 가입한 전체 강사 수를 추적합니다.</p>
                        <div style={{ margin: '1rem 0' }}>
                            <p>총 강사: <strong>{speakersCount}명</strong></p>
                            <p>프리미엄: <strong>{premiumSpeakersCount}명</strong></p>
                        </div>
                        <button
                            className={`btn ${activeView === 'speakers' ? 'btn-primary' : 'btn-outline'}`}
                            style={{ marginTop: 'auto' }}
                            onClick={() => setActiveView(activeView === 'speakers' ? null : 'speakers')}
                        >
                            회원 목록 보기
                        </button>
                    </div>

                    {/* 강연 요청 관리 섹션 */}
                    <div className="dashboard-card glass-panel">
                        <h3>강연 거래 모니터링</h3>
                        <p>현재 거래가 진행중이거나 대기중인 현황입니다.</p>
                        <div style={{ margin: '1rem 0' }}>
                            <p>대기중 요청: <strong style={{ color: 'orange' }}>{pendingRequestsCount}건</strong></p>
                            <p>완료된 요청: <strong style={{ color: 'blue' }}>{completedRequestsCount}건</strong></p>
                        </div>
                        <button
                            className={`btn ${activeView === 'requests' ? 'btn-primary' : 'btn-outline'}`}
                            style={{ marginTop: 'auto' }}
                            onClick={() => setActiveView(activeView === 'requests' ? null : 'requests')}
                        >
                            전체 내역 보기
                        </button>
                    </div>

                    {/* 리뷰 관리 섹션 */}
                    <div className="dashboard-card glass-panel">
                        <h3>강사 후기 관리</h3>
                        <p>작성된 모든 리뷰 모니터링</p>
                        <div style={{ margin: '1rem 0' }}>
                            <p>작성된 총 리뷰: <strong>{totalReviews}개</strong></p>
                        </div>
                        <button
                            className={`btn ${activeView === 'reviews' ? 'btn-primary' : 'btn-outline'}`}
                            style={{ marginTop: 'auto' }}
                            onClick={() => setActiveView(activeView === 'reviews' ? null : 'reviews')}
                        >
                            리뷰 현황 보기
                        </button>
                    </div>
                </div>

                {/* 상세 목록 뷰 영역 */}
                {activeView === 'speakers' && (
                    <div className="admin-list-view glass-panel mt-4 fade-in">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                            <h3 style={{ margin: 0 }}>전체 강사 목록</h3>
                            <div className="filter-toolbar" style={{ display: 'flex', gap: '0.5rem' }}>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="강사명 또는 분야 검색"
                                    value={searchSpeakerKeyword}
                                    onChange={(e) => setSearchSpeakerKeyword(e.target.value)}
                                    style={{ width: '250px' }}
                                />
                            </div>
                        </div>
                        <div className="table-responsive mt-3">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>강사명</th>
                                        <th>등급</th>
                                        <th>카테고리</th>
                                        <th>희망 강연료</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSpeakers.length > 0 ? (
                                        filteredSpeakers.map(s => (
                                            <tr key={s.id}>
                                                <td>{s.name}</td>
                                                <td>{s.isPremium ? <span className="badge badge-premium-sm">프리미엄</span> : '일반'}</td>
                                                <td>{s.category.join(', ')}</td>
                                                <td>{s.priceLabel}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} style={{ textAlign: 'center', color: 'var(--color-text-light)' }}>검색 결과가 없습니다.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeView === 'requests' && (
                    <div className="admin-list-view glass-panel mt-4 fade-in">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                            <h3 style={{ margin: 0 }}>강연 거래 전체 내역</h3>
                            <div className="filter-toolbar" style={{ display: 'flex', gap: '0.5rem' }}>
                                <select
                                    className="form-control"
                                    value={filterRequestStatus}
                                    onChange={(e) => setFilterRequestStatus(e.target.value)}
                                >
                                    <option value="ALL">상태 전체</option>
                                    <option value="PENDING">대기중</option>
                                    <option value="ACCEPTED">수락됨</option>
                                    <option value="REJECTED">거절됨</option>
                                    <option value="COMPLETED">완료됨</option>
                                </select>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="기업명 또는 요청 ID 검색"
                                    value={searchRequestKeyword}
                                    onChange={(e) => setSearchRequestKeyword(e.target.value)}
                                    style={{ width: '250px' }}
                                />
                            </div>
                        </div>
                        <div className="table-responsive mt-3">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>요청 ID</th>
                                        <th>기업명</th>
                                        <th>행사일</th>
                                        <th>상태</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRequests.length > 0 ? (
                                        filteredRequests.map(r => (
                                            <tr key={r.id}>
                                                <td>{r.id.toUpperCase()}</td>
                                                <td>{r.clientName}</td>
                                                <td>{r.eventDate}</td>
                                                <td>
                                                    <span className={`status-badge-sm ${r.status.toLowerCase()}`}>
                                                        {r.status === 'PENDING' ? '대기' : r.status === 'ACCEPTED' ? '수락' : r.status === 'REJECTED' ? '거절' : '완료'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} style={{ textAlign: 'center', color: 'var(--color-text-light)' }}>검색 결과가 없습니다.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeView === 'reviews' && (
                    <div className="admin-list-view glass-panel mt-4 fade-in">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                            <h3 style={{ margin: 0 }}>작성된 리뷰 모니터링</h3>
                            <div className="filter-toolbar" style={{ display: 'flex', gap: '0.5rem' }}>
                                <select
                                    className="form-control"
                                    value={filterReviewRating}
                                    onChange={(e) => setFilterRating(e.target.value)}
                                >
                                    <option value="ALL">별점 전체</option>
                                    <option value="HIGH">우수 (4~5점)</option>
                                    <option value="LOW">주의 (1~3점)</option>
                                </select>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="기업명 또는 강사명 검색"
                                    value={searchReviewKeyword}
                                    onChange={(e) => setSearchReviewKeyword(e.target.value)}
                                    style={{ width: '250px' }}
                                />
                            </div>
                        </div>
                        <div className="table-responsive mt-3">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>기업명</th>
                                        <th>관련 강사</th>
                                        <th>별점</th>
                                        <th>내용 요약</th>
                                        <th>작성일</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredReviews.length > 0 ? (
                                        filteredReviews.map(rev => {
                                            const targetSpeaker = mockSpeakers.find(s => s.id === rev.speakerId);
                                            return (
                                                <tr key={rev.id}>
                                                    <td>{rev.clientName}</td>
                                                    <td>{targetSpeaker?.name || '알수없음'}</td>
                                                    <td style={{ color: '#ffc107', letterSpacing: '2px' }}>{'★'.repeat(rev.rating)}</td>
                                                    <td className="truncate-text" title={rev.content}>{rev.content.substring(0, 20)}...</td>
                                                    <td>{rev.createdAt}</td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={5} style={{ textAlign: 'center', color: 'var(--color-text-light)' }}>검색 결과가 없습니다.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AdminDashboard;
