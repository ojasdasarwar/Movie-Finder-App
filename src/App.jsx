import React, { useEffect, useState } from 'react'
import Search from './components/search'

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY 

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`
  }
}
const App = () => {
  const [searchTerm, setsearchTerm] = useState("");
  const [errorMessage, seterrorMessage] = useState("")
  const [movieList, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState("false");

  const fetchMovies = async ()=> {
    setisLoading(true);
    seterrorMessage("");
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;

      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");  

      }

      const data = await response.json();
      
      if(data.response === 'False') {
      seterrorMessage(error.message || "Failed to fetch movies");

      setMovielist([]);
      return
      }
      setMovies(data.results || []);
     } catch (error) {
      console.error(`Error fetching movies:, ${error}`);
      setErrorMessage();
    } finally {
      setisLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies();

  }, []);

  
  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <header>
          <img src='./hero-img.png' alt='Hero Banner'/>
         <h1> Find <span className='text-gradient'>Movies</span> You'll Enjoy without the Hassle</h1>
         <Search searchTerm={searchTerm} setSearchTerm={setsearchTerm} />
         </header>
        <h1 className='text-white'> {searchTerm}</h1>

        <section className='all-movies'>
          <h2>All Movies</h2> 

          {isLoading ? (
            <p className='text-white'>loading...</p>
          ): errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <p  className='text-white'>{movie.title}</p>
              ))}
            </ul>
          )}

        </section>
      </div>
    </main>
  )
}

export default App