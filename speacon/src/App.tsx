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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

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
            <Link to="/" className="logo" onClick={closeMenu}>
              Spea<span>Con</span>
            </Link>

            <div className="desktop-menu">
              <nav className="nav-links">
                <Link to="/search" className="nav-link">강사 찾기</Link>
                <Link to="/request" className="nav-link">강연 요청</Link>
                <Link to="/reviews" className="nav-link">이용 후기</Link>
              </nav>
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-primary" style={{ textDecoration: 'none' }}>로그인</Link>
              </div>
            </div>

            <button
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="메뉴 열기"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </>
                )}
              </svg>
            </button>
          </div>

          <div className={`mobile-menu-dropdown ${isMenuOpen ? 'open' : ''}`}>
            <nav className="mobile-nav-links">
              <Link to="/search" className="mobile-nav-link" onClick={closeMenu}>강사 찾기</Link>
              <Link to="/request" className="mobile-nav-link" onClick={closeMenu}>강연 요청</Link>
              <Link to="/reviews" className="mobile-nav-link" onClick={closeMenu}>이용 후기</Link>
            </nav>
            <div className="mobile-auth-buttons">
              <Link to="/login" className="btn btn-primary btn-block" style={{ textDecoration: 'none' }} onClick={closeMenu}>로그인</Link>
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
