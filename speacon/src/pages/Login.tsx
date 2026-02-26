import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Role } from '../context/AuthContext';
import './Login.css';

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRoleLogin = (role: Role) => {
        login(role);
        // 로그인 권한 획득 시 각자의 대시보드로 이동
        if (role === 'ADMIN') navigate('/dashboard/admin');
        else if (role === 'SPEAKER') navigate('/dashboard/speaker');
        else if (role === 'CLIENT') navigate('/dashboard/client');
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // 일반 폼 로그인 시 기본적으로 기업(Client) 유저라고 가정
        handleRoleLogin('CLIENT');
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>로그인</h2>
                <p className="auth-subtitle">스피콘에 오신 것을 환영합니다.</p>

                {/* MVP 더미 테스트용 퀵 로그인 패널 */}
                <div style={{
                    margin: '1rem 0 2rem',
                    padding: '1rem',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderRadius: '8px',
                    border: '1px dashed var(--color-border)'
                }}>
                    <p style={{ fontSize: '0.9rem', marginBottom: '0.8rem', textAlign: 'center' }}>🧪 테스트용 빠른 권한 로그인</p>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                        <button type="button" className="btn btn-outline btn-sm" onClick={() => handleRoleLogin('SPEAKER')}>강사로 로그인</button>
                        <button type="button" className="btn btn-outline btn-sm" onClick={() => handleRoleLogin('CLIENT')}>기업으로 로그인</button>
                        <button type="button" className="btn btn-outline btn-sm" onClick={() => handleRoleLogin('ADMIN')}>어드민 로그인</button>
                    </div>
                </div>

                <form onSubmit={handleLogin} className="auth-form">
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
                        로그인
                    </button>
                </form>

                <div className="auth-footer">
                    <p>아직 계정이 없으신가요? <Link to="/signup">회원가입</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
