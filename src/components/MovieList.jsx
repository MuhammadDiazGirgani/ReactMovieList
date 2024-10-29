import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MovieList = ({ movies, setMovies }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [genres, setGenres] = useState([]);
  const [activeGenre, setActiveGenre] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [actionMovies, setActionMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    const fetchMoviesByGenre = async (genreId, setGenreMovies) => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=${genreId}`
        );
        setGenreMovies(response.data.results);
      } catch (error) {
        console.error(`Error fetching movies for genre ${genreId}:`, error);
      }
    };

    fetchGenres();
    fetchMoviesByGenre(28, setActionMovies);   // Action genre
    fetchMoviesByGenre(27, setHorrorMovies);   // Horror genre
    fetchMoviesByGenre(35, setComedyMovies);   // Comedy genre
    fetchMoviesByGenre(10749, setRomanceMovies); // Romance genre
  }, []);

  const handleGenreClick = async (genreId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=${genreId}`
      );
      setMovies(response.data.results);
      setActiveGenre(genreId);
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
    }
  };

  const handlePosterClick = (id) => {
    navigate(`/movies/${id}`);
  };

  const handleSearch = async () => {
    if (!searchTerm) return;
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${searchTerm}`
      );
      setMovies(response.data.results);
      setActiveGenre(null);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ marginTop: '3%', textAlign: 'center' }}>
      {!isMobile && (
        <div style={styles.genreButtonContainer}>
          {genres.map((genre) => (
  <button
    key={genre.id}
    onClick={() => handleGenreClick(genre.id)}
    style={{
      ...styles.genreButton,
      ...(activeGenre === genre.id ? styles.activeGenreButton : {}),
    }}
    onMouseEnter={(e) => e.target.style.backgroundColor = styles.genreButtonHover.backgroundColor}
    onMouseLeave={(e) => e.target.style.backgroundColor = activeGenre === genre.id ? styles.activeGenreButton.backgroundColor : styles.genreButton.backgroundColor}
  >
    {genre.name}
  </button>
))}

        </div>
      )}

      {!isMobile && (
        <div style={styles.searchContainer}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search for a movie..."
            style={styles.searchInput}
          />
          <button onClick={handleSearch} style={styles.searchButton}>Search</button>
        </div>
      )}

      <div className="movie-list" style={{ display: isMobile ? 'none' : 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', marginTop: '20px' }}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={() => handlePosterClick(movie.id)} />
        ))}
      </div>

     {isMobile && (
  <div style={styles.mobileContainer}>
    <div style={styles.searchContainer}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        placeholder="Search for a movie..."
        style={styles.searchInput}
      />
      <button onClick={handleSearch} style={styles.searchButton}>
        Search
      </button>
    </div>
    <div style={styles.mobileMovieList}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => handlePosterClick(movie.id)}
          style={{ minWidth: '150px', marginRight: '10px' }} // Optional: Define a minimum width for cards
        />
      ))}
    </div>
  </div>
)}




    </div>
  );
};

const styles = {
  genreButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '20px',
    paddingLeft: '15%',
    paddingRight: '15%',
  },
  genreButton: {
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: 'bold',
    borderRadius: '20px',
    border: '2px solid #db0000',
    backgroundColor: '#ff0000',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, color 0.3s ease, transform 0.2s ease',
  },
  activeGenreButton: {
    backgroundColor: '#db0000',
    color: '#fff',
    transform: 'scale(1.05)',
  },
  genreButtonHover: {
    backgroundColor: '#ff4d4d',
    color: '#fff',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
  },
  searchInput: {
    padding: '10px',
    fontSize: '16px',
    width: '200px', // Adjust width for mobile
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  searchButton: {
    padding: '10px 20px',
    fontSize: '16px',
    marginLeft: '10px',
    borderRadius: '4px',
    backgroundColor: '#ff0000',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  mobileContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
  },
  mobileMovieList: {
    display: 'flex',
    flexDirection: 'column', // Ensures vertical stacking
    padding: '10px',
    gap: '10px', // Optional: Add space between the movie card sections
  },
};

export default MovieList;
