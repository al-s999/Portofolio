import React,{ useEffect, useState } from 'react';

function createParticleHtml() {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const particleCount = 200;
  let particlesHTML = '';
  
  for (let i = 0; i < particleCount; i++) {
    const size = getRandomInt(2, 6);
    const top = getRandomInt(15, 95);
    const left = getRandomInt(5, 95);
    const delay = getRandomInt(0, 30) / 10;
    const r = getRandomInt(80, 160);
    const g = getRandomInt(185, 255);
    const b = getRandomInt(160, 255);
    const a = getRandomInt(2, 8) / 10;
    
    // Menambahkan setiap partikel ke string
    particlesHTML += `<div class="particle" style="top:${top}%; left:${left}%; width:${size}px; height:${size}px; animation-delay:${delay}s; background-color:rgba(${r},${g},${b},${a});"></div>`;
  }
  
  return particlesHTML; // Kembalikan string HTML yang sudah jadi
}


function Hero() {
  // 1. State untuk menyimpan string HTML partikel
  const [particleHtml, setParticleHtml] = useState('');

  // 2. useEffect untuk menghasilkan HTML saat komponen dimuat
  useEffect(() => {
    const html = createParticleHtml();
    setParticleHtml(html);
  }, []);

  return (
    <div className="title" id="home">
      <div id="particleGenerator" dangerouslySetInnerHTML={{ __html: particleHtml }}></div>
      <h2>Portofolio Of </h2>
      <h2>Ahmad Rosyid Alfualdi</h2>
      <div className="social-links">
        <a href="https://github.com/al-s999?tab=repositories" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/ahmad-rosyid-al-fualdi-b04234354/" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-linkedin"></i>
        </a>
        <a href="https://www.kaggle.com/ahmadrosyidalfualdi/code" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-kaggle"></i>
        </a>
      </div>
    </div>
  );
}

export default Hero;