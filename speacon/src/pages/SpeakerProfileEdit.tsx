import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockSpeakers } from '../data/mockData';
import './SpeakerProfileEdit.css';

const SpeakerProfileEdit: React.FC = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // In a real app, we would fetch the speaker's data based on their user ID.
    // Here we use a dummy speaker from mock data for demonstration.
    const [formData, setFormData] = useState({
        name: '',
        headline: '',
        description: '',
        tags: [] as string[],
        portfolio: [] as { title: string, type: 'video' | 'pdf' }[],
        priceAmount: 0,
        contactEmail: '',
        imageUrl: '',
    });

    const [newTag, setNewTag] = useState('');

    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'SPEAKER') {
            alert('강사 권한이 필요합니다.');
            navigate('/login');
            return;
        }

        // Dummy fetch
        const speaker = mockSpeakers[0]; // Assuming this is the current speaker
        if (speaker) {
            setFormData({
                name: speaker.name,
                headline: speaker.headline,
                description: speaker.description,
                tags: [...speaker.tags],
                portfolio: Array.isArray(speaker.portfolio) ? [...speaker.portfolio] as { title: string, type: 'video' | 'pdf' }[] : [],
                priceAmount: speaker.priceAmount,
                contactEmail: '', // Not in mock data, leave empty
                imageUrl: speaker.imageUrl || '',
            });
        }
    }, [isAuthenticated, user, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()]
            }));
            setNewTag('');
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setFormData(prev => ({ ...prev, imageUrl: previewUrl }));
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleAddPortfolio = () => {
        setFormData(prev => ({
            ...prev,
            portfolio: [...prev.portfolio, { title: '', type: 'video' }]
        }));
    };

    const handleRemovePortfolio = (index: number) => {
        setFormData(prev => ({
            ...prev,
            portfolio: prev.portfolio.filter((_, i) => i !== index)
        }));
    };

    const handlePortfolioChange = (index: number, field: 'title' | 'type', value: string) => {
        setFormData(prev => {
            const newPortfolio = [...prev.portfolio];
            newPortfolio[index] = { ...newPortfolio[index], [field]: value } as { title: string, type: 'video' | 'pdf' };
            return { ...prev, portfolio: newPortfolio };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, send data to backend API
        console.log('Submitting profile update:', formData);
        alert('프로필이 성공적으로 업데이트되었습니다.');
        navigate('/dashboard/speaker');
    };

    return (
        <div className="profile-edit-container">
            <div className="container profile-edit-wrapper">
                <div className="profile-edit-header">
                    <h2>내 프로필 수정</h2>
                    <p>플랫폼에 노출될 프로필 정보를 수정하세요.</p>
                </div>

                <form className="profile-edit-form glass-panel" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="imageFile">프로필 사진 업로드 (미리보기)</label>
                        <input
                            type="file"
                            id="imageFile"
                            accept="image/*"
                            className="form-control"
                            onChange={handleImageChange}
                        />
                        {formData.imageUrl && (
                            <div className="image-preview-wrapper mt-2">
                                <img src={formData.imageUrl} alt="Profile Preview" className="profile-image-preview" style={{ width: '120px', height: '120px', borderRadius: '12px', objectFit: 'cover', border: '2px solid var(--color-border)' }} />
                            </div>
                        )}
                    </div>

                    <div className="form-row">
                        <div className="form-group half">
                            <label htmlFor="name">이름 (강사명)</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group half">
                            <label htmlFor="headline">한 줄 소개 (직함/타이틀)</label>
                            <input
                                type="text"
                                id="headline"
                                name="headline"
                                className="form-control"
                                value={formData.headline}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">상세 소개 (Bio)</label>
                        <textarea
                            id="description"
                            name="description"
                            className="form-control"
                            rows={5}
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="강의 경력, 주요 성과, 강의 스타일 등을 상세히 적어주세요."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>전문 분야 태그</label>
                        <div className="tag-input-group" style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <input
                                type="text"
                                className="form-control"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                placeholder="새 태그 입력 후 엔터 또는 추가 버튼"
                                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); } }}
                            />
                            <button type="button" className="btn btn-outline" onClick={handleAddTag}>추가</button>
                        </div>
                        <div className="tags-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {formData.tags.map(tag => (
                                <span key={tag} className="expertise-tag">
                                    {tag}
                                    <button type="button" className="tag-remove-btn" onClick={() => handleRemoveTag(tag)}>&times;</button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="form-group portfolio-section mt-4 glass-panel" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <label style={{ margin: 0 }}>포트폴리오 및 대표 강연 관리</label>
                            <button type="button" className="btn btn-outline btn-sm" onClick={handleAddPortfolio}>+ 항목 추가</button>
                        </div>
                        {formData.portfolio.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {formData.portfolio.map((item, idx) => (
                                    <div key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                        <select
                                            className="form-control"
                                            style={{ width: '120px' }}
                                            value={item.type}
                                            onChange={(e) => handlePortfolioChange(idx, 'type', e.target.value)}
                                        >
                                            <option value="video">영상(Video)</option>
                                            <option value="pdf">문서(PDF)</option>
                                        </select>
                                        <input
                                            type="text"
                                            className="form-control"
                                            style={{ flex: 1 }}
                                            placeholder="포트폴리오 제목 (예: 2024 하반기 경제 전망)"
                                            value={item.title}
                                            onChange={(e) => handlePortfolioChange(idx, 'title', e.target.value)}
                                            required
                                        />
                                        <button type="button" className="btn btn-outline" style={{ color: 'red', borderColor: 'transparent' }} onClick={() => handleRemovePortfolio(idx)}>삭제</button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem' }}>등록된 포트폴리오가 없습니다. 항목을 추가해 보세요.</p>
                        )}
                    </div>

                    <div className="form-row mt-4">
                        <div className="form-group half">
                            <label htmlFor="priceAmount">예상 강연료 (원/시간)</label>
                            <input
                                type="number"
                                id="priceAmount"
                                name="priceAmount"
                                className="form-control"
                                value={formData.priceAmount}
                                onChange={handleChange}
                                min="0"
                                step="10000"
                                required
                            />
                        </div>
                        <div className="form-group half">
                            <label htmlFor="contactEmail">연락처 이메일</label>
                            <input
                                type="email"
                                id="contactEmail"
                                name="contactEmail"
                                className="form-control"
                                value={formData.contactEmail}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-actions mt-4" style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                        <button type="button" className="btn btn-outline" onClick={() => navigate('/dashboard/speaker')}>취소</button>
                        <button type="submit" className="btn btn-primary">변경사항 저장</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SpeakerProfileEdit;
