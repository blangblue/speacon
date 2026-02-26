import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleQuickLogin = async (targetEmail: string) => {
        const success = await login(targetEmail, '1234');
        if (success) navigate('/'); // 로그인 훅 내에서 상태가 세팅되면 AppRouter가 dashboard로 분기해줌 (또는 여기서 role기반 강제이동 시킬수도 있음)
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) {
            navigate('/');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>로그인</h2>
                <p className="auth-subtitle">스피콘에 오신 것을 환영합니다.</p>

                {/* DB 연동 빠른 로그인 (테스트용) */}
                <div style={{
                    margin: '1rem 0 2rem',
                    padding: '1rem',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderRadius: '8px',
                    border: '1px dashed var(--color-border)'
                }}>
                    <p style={{ fontSize: '0.9rem', marginBottom: '0.8rem', textAlign: 'center' }}>🧪 테스트용 통합 계정 로그인</p>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                        <button type="button" className="btn btn-outline btn-sm" onClick={() => handleQuickLogin('tutor')}>강사계정 (tutor)</button>
                        <button type="button" className="btn btn-outline btn-sm" onClick={() => handleQuickLogin('company')}>기업계정 (company)</button>
                        <button type="button" className="btn btn-outline btn-sm" onClick={() => handleQuickLogin('admin')}>운영자 (admin)</button>
                    </div>
                </div>

                <form onSubmit={handleLogin} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">이메일(아이디)</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="아이디를 입력하세요"
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
                            placeholder="비밀번호 1234"
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
