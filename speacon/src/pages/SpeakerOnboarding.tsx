import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SpeakerOnboarding.css';

function SpeakerOnboarding() {
    const [roleTitle, setRoleTitle] = useState('');
    const [headline, setHeadline] = useState('');
    const [description, setDescription] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: 백엔드 API 연동하여 Speaker 레코드 생성
        console.log('Speaker Onboarding Data:', { roleTitle, headline, description, priceRange });
        alert('강사 프로필이 성공적으로 등록되었습니다!');
        navigate('/');
    };

    return (
        <div className="onboarding-page">
            <div className="onboarding-container">
                <h2>강사 프로필 완성하기</h2>
                <p className="onboarding-subtitle">강연 기획자들에게 매력적인 프로필을 어필해보세요.</p>

                <form onSubmit={handleSubmit} className="onboarding-form">
                    <div className="form-group">
                        <label htmlFor="roleTitle">직함 및 소속</label>
                        <input
                            type="text"
                            id="roleTitle"
                            value={roleTitle}
                            onChange={(e) => setRoleTitle(e.target.value)}
                            placeholder="ex) 토스 10년차 프로덕트 디자이너"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="headline">프로필 헤드라인</label>
                        <input
                            type="text"
                            id="headline"
                            value={headline}
                            onChange={(e) => setHeadline(e.target.value)}
                            placeholder="ex) 실무에서 바로 통하는 데이터 기반 디자인 전략"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="priceRange">예상 강연료 (1시간 기준)</label>
                        <select
                            id="priceRange"
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.target.value)}
                            required
                        >
                            <option value="" disabled>선택해주세요</option>
                            <option value="협의 후 결정">협의 후 결정 (무료 포함)</option>
                            <option value="50만원 이하">50만원 미만</option>
                            <option value="50만원 - 100만원">50만원 - 100만원</option>
                            <option value="100만원 - 200만원">100만원 - 200만원</option>
                            <option value="200만원 이상">200만원 이상</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">자기 소개 및 강연 스타일</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="수강생들에게 어떤 가치를 전달할 수 있는지, 본인만의 특별한 강연 경험이나 전문성을 자세히 적어주세요."
                            rows={6}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary onboarding-submit">
                        프로필 공개하기
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SpeakerOnboarding;
