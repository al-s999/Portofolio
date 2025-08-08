import React from 'react';

function Header() {
  return (
    <div className="header">
        <h1>My Portofolio</h1>
        <a href="/">Home</a>
        <a href="#about">About Me</a>
        <a href="http://localhost:5174/">Projects</a>
        <a href="#resumes">Resume</a>
        <a href="#Contact">Contact</a>
    </div>
  );
}

export default Header;