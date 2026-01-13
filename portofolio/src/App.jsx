import React from 'react';

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import cvFile from './assets/Putih Netral Minimalis Profesional CV Resume.pdf';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <br />
        <br />
        <About />
        <Projects />
        <Resume />
        <Contact />
        <section className="cv-cta" aria-label="Download CV">
          <a href={cvFile} download>
            <button className="cv-cta-button">Install CV</button>
          </a>
        </section>
      </main>
      <Footer />
      <a href="http://localhost:8000" target="_blank" rel="noopener noreferrer">
        <button className="chat-button"><i className="far fa-comment"></i></button>
      </a>
    </>
  )
}

export default App
