import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import RequestForm from './pages/RequestForm';
import SpeakerProfile from './pages/SpeakerProfile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SpeakerOnboarding from './pages/SpeakerOnboarding';
import './App.css';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <div className="app-container">
        <header className={`app-header ${scrolled ? 'scrolled' : ''}`}>
          <div className="container header-container">
            <Link to="/" className="logo">
              Spea<span>Con</span>
            </Link>
            <nav className="nav-links">
              <Link to="/search" className="nav-link">강사 찾기</Link>
              <Link to="/request" className="nav-link">강연 요청</Link>
              <Link to="/reviews" className="nav-link">이용 후기</Link>
            </nav>
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-outline" style={{ textDecoration: 'none' }}>로그인</Link>
              <Link to="/signup" className="btn btn-primary" style={{ textDecoration: 'none' }}>회원가입</Link>
            </div>
          </div>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/request" element={<RequestForm />} />
            <Route path="/speaker/:id" element={<SpeakerProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/speaker-onboarding" element={<SpeakerOnboarding />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
