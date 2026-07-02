import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (id) => {
    if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="header">
        <h1>My Portofolio</h1>
        <div className="nav-links">
            <Link to="/">Home</Link>
            <button onClick={() => handleScroll('about')} className="nav-btn">About Me</button>
            <Link to="/projects">Projects</Link>
            <button onClick={() => handleScroll('resumes')} className="nav-btn">Resume</button>
            <button onClick={() => handleScroll('Contact')} className="nav-btn">Contact</button>
        </div>
    </div>
  );
}

export default Header;