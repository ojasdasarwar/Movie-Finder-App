import React, { useState } from 'react'
import Search from './components/search'

const App = () => {
  const [searchTerm, setsearchTerm] = useState("");

  
  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <header>
          <img src='./hero-img.png' alt='Hero Banner'/>
         <h1> Find <span className='text-gradient'>Movies</span> You'll Enjoy without the Hassle</h1>
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setsearchTerm} />
        <h1 className='text-white'> {searchTerm}</h1>
      </div>
    </main>
  )
}

export default App