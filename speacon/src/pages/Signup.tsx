import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // 공유 스타일

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState<'CLIENT' | 'SPEAKER'>('CLIENT');
    const navigate = useNavigate();

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: 백엔드 API 연동
        console.log('Signup attempt:', { email, password, name, role });
        alert(`${role === 'SPEAKER' ? '강사' : '기획자'} 회원가입 시도`);
        if (role === 'SPEAKER') {
            navigate('/speaker-onboarding'); // 강사 온보딩 페이지로 이동 기획
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>회원가입</h2>
                <p className="auth-subtitle">스피콘과 함께 최고의 강연을 만들어보세요.</p>

                <form onSubmit={handleSignup} className="auth-form">
                    <div className="role-selection" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                        <label className={`role-card ${role === 'CLIENT' ? 'active' : ''}`} style={{ flex: 1, padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', cursor: 'pointer', textAlign: 'center', borderColor: role === 'CLIENT' ? 'var(--primary)' : 'var(--border)', backgroundColor: role === 'CLIENT' ? 'rgba(100, 108, 255, 0.05)' : 'transparent' }}>
                            <input type="radio" value="CLIENT" checked={role === 'CLIENT'} onChange={() => setRole('CLIENT')} style={{ display: 'none' }} />
                            <strong>강연 기획자</strong>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>강사를 찾고 섭외합니다</div>
                        </label>
                        <label className={`role-card ${role === 'SPEAKER' ? 'active' : ''}`} style={{ flex: 1, padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', cursor: 'pointer', textAlign: 'center', borderColor: role === 'SPEAKER' ? 'var(--primary)' : 'var(--border)', backgroundColor: role === 'SPEAKER' ? 'rgba(100, 108, 255, 0.05)' : 'transparent' }}>
                            <input type="radio" value="SPEAKER" checked={role === 'SPEAKER'} onChange={() => setRole('SPEAKER')} style={{ display: 'none' }} />
                            <strong>강연자 (강사)</strong>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>프로필을 등록하고 시연합니다</div>
                        </label>
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">이름 (또는 기업명)</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="이름을 입력하세요"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">이메일</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="speacon@example.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">비밀번호</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호를 입력하세요"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary auth-submit">
                        가입하기
                    </button>
                </form>

                <div className="auth-footer">
                    <p>이미 계정이 있으신가요? <Link to="/login">로그인</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
