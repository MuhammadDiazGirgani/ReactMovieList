// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import MovieCarousel from './components/MovieCarousel';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail'; // Import MovieDetail

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1` // Fetching first page
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<><MovieCarousel movies={movies} /><h2 style={{ marginTop:'5%' }}>Popular Movies</h2><MovieList movies={movies} setMovies={setMovies} /></>} />
          <Route path="/movies/:id" element={<MovieDetail />} /> {/* Route for movie details */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
