import React from 'react'

import Hero from '../../portofolio/src/components/Hero'
import Headers from './components/Header'
import MainContainer from './components/MainContainer'
import Footer from '../../portofolio/src/components/Footer'

function App() {

  return (
    <>
      <Headers />
      <main>
        <Hero />
        <MainContainer />
      </main>
      <Footer />
      <a href="https://portofolio-pearl-sigma.vercel.app/" target="_blank" rel="noopener noreferrer">
        <button className="chat-button"><i className="far fa-comment"></i></button>
      </a>
    </>
  )
}

export default App
