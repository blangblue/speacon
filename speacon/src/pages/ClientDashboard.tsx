import React, { useState } from 'react';
import { mockRequests, mockReviews, getSpeakerById } from '../data/mockData';
import ReviewWriteModal from '../components/ReviewWriteModal';
import './ClientDashboard.css';

const ClientDashboard: React.FC = () => {
    // 기업 본인의 ID가 'client_999'라고 가정한 더미 로그인 상태
    const currentClientId = "client_999";

    const [requests, setRequests] = useState(
        mockRequests.filter(req => req.clientId === currentClientId)
    );

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [selectedSpeakerForReview, setSelectedSpeakerForReview] = useState<{ id: string, name: string } | null>(null);
    const [selectedRequestIdForReview, setSelectedRequestIdForReview] = useState<string | null>(null);

    // 내부에서 리뷰 작성/수정을 임시 추적하는 State
    const [reviews, setReviews] = useState(mockReviews.filter(rev => rev.clientId === currentClientId));

    const handleCancel = (id: string) => {
        if (window.confirm('정말 강연 요청을 취소하시겠습니까?')) {
            setRequests(requests.filter(req => req.id !== id));
            alert('요청이 취소되었습니다.');
        }
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

    const handleOpenReviewModal = (requestId: string, speakerId: string, speakerName: string) => {
        setSelectedRequestIdForReview(requestId);
        setSelectedSpeakerForReview({ id: speakerId, name: speakerName });
        setIsReviewModalOpen(true);
    };

    const handleCloseReviewModal = () => {
        setIsReviewModalOpen(false);
        setSelectedSpeakerForReview(null);
        setSelectedRequestIdForReview(null);
    };

    const handleReviewSubmit = (rating: number, content: string) => {
        if (!selectedRequestIdForReview || !selectedSpeakerForReview) return;

        console.log(`Review submitted for request ${selectedRequestIdForReview}:`, { rating, content });

        const existingReviewIndex = reviews.findIndex(r => r.requestId === selectedRequestIdForReview);
        if (existingReviewIndex >= 0) {
            // 수정
            const updated = [...reviews];
            updated[existingReviewIndex] = { ...updated[existingReviewIndex], rating, content };
            setReviews(updated);
            alert('리뷰가 성공적으로 수정되었습니다.');
        } else {
            // 신규 작성
            const newReview = {
                id: `rev_temp_${Date.now()}`,
                requestId: selectedRequestIdForReview,
                clientId: currentClientId,
                clientName: '스마일기업(주)',
                speakerId: selectedSpeakerForReview.id,
                rating,
                content,
                createdAt: new Date().toISOString().split('T')[0]
            };
            setReviews([...reviews, newReview]);
            alert('리뷰가 성공적으로 등록되었습니다.');
        }

        handleCloseReviewModal();
    };

    return (
        <div className="dashboard-container">
            <div className="container">
                <h1 className="dashboard-title">기업 대시보드</h1>
                <p className="dashboard-subtitle">의뢰한 강연 매칭 현황과 강사의 회신 상태를 확인하세요.</p>

                <div className="dashboard-grid">
                    {/* 발송한 요청 트래킹 섹션 */}
                    <div className="dashboard-card glass-panel requests-section" style={{ gridColumn: '1 / -1' }}>
                        <h3>발신 강연 신청 내역</h3>
                        <div className="requests-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', marginTop: '1rem' }}>
                            {requests.length > 0 ? (
                                requests.map(req => {
                                    const speaker = getSpeakerById(req.targetSpeakerId);
                                    return (
                                        <div key={req.id} className="request-item" style={{ border: '1px solid var(--color-border)', padding: '1.5rem', borderRadius: 'var(--border-radius-md)' }}>
                                            <div className="request-info" style={{ marginBottom: '1rem' }}>
                                                <h4>강사: {speaker?.name} <span className="req-date" style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>({req.eventDate})</span></h4>
                                                <p style={{ marginBottom: '0.5rem' }}><strong>장소:</strong> {req.eventLocation} | <strong>예산:</strong> {req.budgetRange}</p>
                                                <p className="req-created" style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>요청일: {req.createdAt}</p>
                                            </div>
                                            <div className="request-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>{getStatusBadge(req.status)}</div>
                                                {req.status === 'PENDING' && (
                                                    <div className="action-buttons">
                                                        <button className="btn btn-outline btn-sm" onClick={() => handleCancel(req.id)}>요청 취소</button>
                                                    </div>
                                                )}
                                                {req.status === 'COMPLETED' && (() => {
                                                    const existingReview = reviews.find(r => r.requestId === req.id);
                                                    return (
                                                        <div className="action-buttons">
                                                            <button
                                                                className={`btn ${existingReview ? 'btn-outline' : 'btn-primary'} btn-sm`}
                                                                onClick={() => handleOpenReviewModal(req.id, req.targetSpeakerId, speaker?.name || '강사')}
                                                            >
                                                                {existingReview ? '리뷰 수정하기' : '리뷰 작성하기'}
                                                            </button>
                                                        </div>
                                                    );
                                                })()}
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <p>발신한 강연 요청이 없습니다.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {isReviewModalOpen && selectedSpeakerForReview && selectedRequestIdForReview && (() => {
                const existingReview = reviews.find(r => r.requestId === selectedRequestIdForReview);
                return (
                    <ReviewWriteModal
                        isOpen={isReviewModalOpen}
                        onClose={handleCloseReviewModal}
                        onSubmit={handleReviewSubmit}
                        speakerName={selectedSpeakerForReview.name}
                        initialRating={existingReview?.rating}
                        initialContent={existingReview?.content}
                    />
                );
            })()}
        </div>
    );
};

export default ClientDashboard;
