import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockRequests } from '../data/mockData';
import './SpeakerDashboard.css';

const SpeakerDashboard: React.FC = () => {
    const navigate = useNavigate();
    // 강사 본인의 ID가 'spk_001'이라고 가정한 더미 로그인 상태
    const currentSpeakerId = "spk_001";

    const [requests, setRequests] = useState(
        mockRequests.filter(req => req.targetSpeakerId === currentSpeakerId)
    );

    const handleResponse = (id: string, newStatus: any) => {
        setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
        alert(`요청이 ${newStatus === 'ACCEPTED' ? '수락' : '거절'} 처리되었습니다.`);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'PENDING': return <span className="status-badge pending" style={{ color: 'orange' }}>대기중</span>;
            case 'ACCEPTED': return <span className="status-badge accepted" style={{ color: 'green' }}>수락됨</span>;
            case 'REJECTED': return <span className="status-badge rejected" style={{ color: 'red' }}>거절됨</span>;
            case 'COMPLETED': return <span className="status-badge completed" style={{ color: 'blue' }}>완료됨</span>;
            default: return null;
        }
    };

    return (
        <div className="dashboard-container">
            <div className="container">
                <h1 className="dashboard-title">강사 마이페이지</h1>
                <p className="dashboard-subtitle">프로필을 관리하고 수신된 강연 요청을 확인하세요.</p>

                <div className="dashboard-grid">
                    {/* 프로필 수정 섹션 */}
                    <div className="dashboard-card glass-panel profile-section">
                        <h3>내 프로필 관리</h3>
                        <p>전문 분야, 포트폴리오, 예상 강연료 등을 상시 업데이트하세요.</p>
                        <button className="btn btn-primary" style={{ marginTop: 'auto' }} onClick={() => navigate('/speaker/edit')}>프로필 수정하기</button>
                    </div>

                    {/* 요청 확인 섹션 */}
                    <div className="dashboard-card glass-panel requests-section" style={{ gridColumn: '1 / -1' }}>
                        <h3>강연 요청 수신함</h3>
                        <div className="requests-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                            {requests.length > 0 ? (
                                requests.map(req => (
                                    <div key={req.id} className="request-item" style={{ border: '1px solid var(--color-border)', padding: '1.5rem', borderRadius: 'var(--border-radius-md)' }}>
                                        <div className="request-info" style={{ marginBottom: '1rem' }}>
                                            <h4>{req.clientName} <span className="req-date" style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>({req.eventDate})</span></h4>
                                            <p style={{ marginBottom: '0.5rem' }}><strong>장소:</strong> {req.eventLocation} | <strong>예산:</strong> {req.budgetRange}</p>
                                            <p className="req-created" style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>요청일: {req.createdAt}</p>
                                        </div>
                                        <div className="request-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>{getStatusBadge(req.status)}</div>
                                            {req.status === 'PENDING' && (
                                                <div className="action-buttons" style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <button className="btn btn-primary btn-sm" onClick={() => handleResponse(req.id, 'ACCEPTED')}>수락</button>
                                                    <button className="btn btn-outline btn-sm" onClick={() => handleResponse(req.id, 'REJECTED')}>거절</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>수신된 강연 요청이 없습니다.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpeakerDashboard;
