import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectPage from './components/ProjectPage';
import cvFile from './assets/Putih Netral Minimalis Profesional CV Resume.pdf';

function Home() {
  return (
    <main>
      <Hero />
      <br />
      <br />
      <About />
      <Projects />
      <Resume />
      <section className="cv-cta" aria-label="Download CV">
        <a href={cvFile} download>
          <button className="cv-cta-button">Install CV</button>
        </a>
      </section>
      <Contact />
    </main>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectPage />} />
      </Routes>
      <Footer />
      <a href="https://portofolio-pearl-sigma.vercel.app/" target="_blank" rel="noopener noreferrer">
        <button className="chat-button"><i className="far fa-comment"></i></button>
      </a>
    </Router>
  )
}

export default App;
