import React from 'react';
import { mockSpeakers, mockRequests, mockReviews } from '../data/mockData';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
    const speakersCount = mockSpeakers.length;
    const premiumSpeakersCount = mockSpeakers.filter(s => s.isPremium).length;
    const pendingRequestsCount = mockRequests.filter(r => r.status === 'PENDING').length;
    const completedRequestsCount = mockRequests.filter(r => r.status === 'COMPLETED').length;
    const totalReviews = mockReviews.length;

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
                        <button className="btn btn-outline" style={{ marginTop: 'auto' }}>회원 목록 보기</button>
                    </div>

                    {/* 강연 요청 관리 섹션 */}
                    <div className="dashboard-card glass-panel">
                        <h3>강연 거래 모니터링</h3>
                        <p>현재 거래가 진행중이거나 대기중인 현황입니다.</p>
                        <div style={{ margin: '1rem 0' }}>
                            <p>대기중 요청: <strong style={{ color: 'orange' }}>{pendingRequestsCount}건</strong></p>
                            <p>완료된 요청: <strong style={{ color: 'blue' }}>{completedRequestsCount}건</strong></p>
                        </div>
                        <button className="btn btn-outline" style={{ marginTop: 'auto' }}>전체 내역 보기</button>
                    </div>

                    {/* 리뷰 관리 섹션 */}
                    <div className="dashboard-card glass-panel">
                        <h3>강사 후기 관리</h3>
                        <p>작성된 모든 리뷰 모니터링</p>
                        <div style={{ margin: '1rem 0' }}>
                            <p>작성된 총 리뷰: <strong>{totalReviews}개</strong></p>
                        </div>
                        <button className="btn btn-outline" style={{ marginTop: 'auto' }}>리뷰 현황 보기</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
