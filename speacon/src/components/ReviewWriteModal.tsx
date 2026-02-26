import React, { useState } from 'react';
import './ReviewWriteModal.css';

interface ReviewWriteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (rating: number, content: string) => void;
    speakerName: string;
    initialRating?: number;
    initialContent?: string;
}

const ReviewWriteModal: React.FC<ReviewWriteModalProps> = ({ isOpen, onClose, onSubmit, speakerName, initialRating, initialContent }) => {
    const [rating, setRating] = useState<number>(initialRating || 5);
    const [content, setContent] = useState(initialContent || '');
    const isEditMode = !!initialContent;

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(rating, content);
        setRating(5);
        setContent('');
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content glass-panel">
                <button className="modal-close" onClick={onClose}>&times;</button>
                <h3>강연 리뷰 {isEditMode ? '수정' : '작성'}</h3>
                <p className="modal-subtitle"><strong>{speakerName}</strong> 강사님의 강연은 어떠셨나요?</p>

                <form onSubmit={handleSubmit} className="review-form">
                    <div className="form-group rating-group">
                        <label>별점 (1~5)</label>
                        <div className="rating-stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`star ${star <= rating ? 'active' : ''}`}
                                    onClick={() => setRating(star)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">리뷰 내용</label>
                        <textarea
                            id="content"
                            className="form-control"
                            rows={4}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="강연에 대한 솔직한 후기를 남겨주세요."
                            required
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn btn-outline" onClick={onClose}>취소</button>
                        <button type="submit" className="btn btn-primary">리뷰 {isEditMode ? '수정' : '등록'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewWriteModal;
