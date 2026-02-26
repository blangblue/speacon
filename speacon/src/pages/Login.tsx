import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: 백엔드 API 연동
        console.log('Login attempt:', { email, password });
        alert('로그인 시도 (백엔드 연동 전)');
        navigate('/');
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>로그인</h2>
                <p className="auth-subtitle">스피콘에 오신 것을 환영합니다.</p>

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
