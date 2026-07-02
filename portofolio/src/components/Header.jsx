import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
        <h1>My Portofolio</h1>
        <div className="nav-links">
            <Link to="/">Home</Link>
            <a href="/#about">About Me</a>
            <Link to="/projects">Projects</Link>
            <a href="/#resumes">Resume</a>
            <a href="/#Contact">Contact</a>
        </div>
    </div>
  );
}

export default Header;