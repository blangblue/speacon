import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSpeakerById } from '../data/mockData';
import './RequestForm.css';

const RequestForm: React.FC = () => {
    const [searchParams] = useSearchParams();
    const speakerId = searchParams.get('speakerId');
    const [requestedSpeakerName, setRequestedSpeakerName] = useState('');

    useEffect(() => {
        if (speakerId) {
            const speaker = getSpeakerById(speakerId);
            if (speaker) {
                setRequestedSpeakerName(speaker.name);
            }
        }
    }, [speakerId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('강연 의뢰가 성공적으로 접수되었습니다. (데모)');
    };

    return (
        <div className="request-page">
            <div className="container request-container">
                <div className="request-header">
                    <h1>강연 의뢰하기</h1>
                    <p>기업과 단체에 딱 맞는 강연을 위해 아래 정보를 상세히 입력해주세요.</p>
                </div>

                <form className="request-form glass-panel" onSubmit={handleSubmit}>
                    <div className="form-section">
                        <h3>1. 의뢰인 정보</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label>기업/기관명 *</label>
                                <input type="text" placeholder="예) 스피콘 주식회사" required />
                            </div>
                            <div className="form-group">
                                <label>담당자 성함 *</label>
                                <input type="text" placeholder="예) 홍길동 프로" required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>연락처 *</label>
                                <input type="tel" placeholder="010-0000-0000" required />
                            </div>
                            <div className="form-group">
                                <label>이메일 *</label>
                                <input type="email" placeholder="example@speacon.com" required />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>2. 강연 기본 정보</h3>
                        <div className="form-group">
                            <label>원하는 전문가 (선택)</label>
                            <input
                                type="text"
                                placeholder="특정 강사를 원하시면 이름을 입력해주세요 (예: 김AI)"
                                value={requestedSpeakerName}
                                onChange={(e) => setRequestedSpeakerName(e.target.value)}
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>강연 희망일 *</label>
                                <input type="date" required />
                            </div>
                            <div className="form-group">
                                <label>희망 장소 *</label>
                                <input type="text" placeholder="예) 본사 대강당 (서울시 강남구)" required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>예상 청중 수</label>
                                <select>
                                    <option>50명 미만</option>
                                    <option>50명 ~ 100명</option>
                                    <option>100명 ~ 300명</option>
                                    <option>300명 이상</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>강연 예산 (1회 기준)</label>
                                <select>
                                    <option>100만원 미만</option>
                                    <option>100만원 ~ 300만원</option>
                                    <option>300만원 ~ 500만원</option>
                                    <option>500만원 이상</option>
                                    <option>협의 가능</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>3. 강연 상세 내용</h3>
                        <div className="form-group">
                            <label>강연 목적 및 요청사항</label>
                            <textarea
                                rows={5}
                                placeholder="어떤 주제로 강연을 희망하시는지, 청중의 특성(직급, 직무 등)은 어떠한지 자세히 적어주시면 더 정확한 매칭이 가능합니다."
                            ></textarea>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn btn-outline">취소</button>
                        <button type="submit" className="btn btn-primary btn-large">의뢰서 제출하기</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RequestForm;
