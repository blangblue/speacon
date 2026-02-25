import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import RequestForm from './pages/RequestForm';
import SpeakerProfile from './pages/SpeakerProfile';
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
              <button className="btn btn-outline">로그인</button>
              <button className="btn btn-primary">강사 등록</button>
            </div>
          </div>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/request" element={<RequestForm />} />
            <Route path="/speaker/:id" element={<SpeakerProfile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
