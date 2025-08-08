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
    </>
  )
}

export default App
