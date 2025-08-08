import React from 'react';

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';

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
      </main>
      <Footer />
      <a href=""><button className="chat-button"><i className="far fa-comment"></i></button></a>
    </>
  )
}

export default App
