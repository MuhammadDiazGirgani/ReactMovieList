// src/components/MovieDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
        );
        setMovie(response.data);

        // Fetch the trailer video
        const trailerResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
        );
        const youtubeTrailer = trailerResponse.data.results.find(
          video => video.site === 'YouTube' && video.type === 'Trailer'
        );
        setTrailerKey(youtubeTrailer ? youtubeTrailer.key : null);

        setLoading(false);
      } catch (err) {
        setError("Error fetching movie details");
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="movie-detail" style={styles.container}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        style={styles.poster}
      />
      <div style={styles.overlay}>
        <div style={styles.iframeContainer}>
          {trailerKey ? (
            <iframe
              width="100%"
              height="250"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="YouTube trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <a
              href={`https://www.youtube.com/results?search_query=${movie.title} trailer`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={styles.button}
            >
              Watch Trailer on YouTube
            </a>
          )}
        </div>
        <div style={styles.textContainer}>
          <h1 style={styles.title}>{movie.title}</h1>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <div style={styles.rating}>
            <span>Rating: </span>
            {Array(Math.round(movie.vote_average / 2))
              .fill()
              .map((_, i) => (
                <FaStar key={i} color="#FFD700" size={16} />
              ))}
          </div>
          <p style={{ marginTop: '10px' }}><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
          <p><strong>Overview:</strong> {movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

// Styles with flex layout adjustments and mobile-first responsive design
const styles = {
  container: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(40%) blur(2px)',
  },
  overlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column', // Column layout for mobile-first approach
    gap: '20px',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '1000px',
  },
  iframeContainer: {
    width: '100%',
    maxWidth: '600px',
    height: 'auto',
  },
  textContainer: {
    textAlign: 'center', // Centered text on mobile
  },
  title: {
    fontSize: '2rem',
    marginBottom: '15px',
  },
  button: {
    display: 'inline-block',
    marginTop: '15px',
    backgroundColor: '#ff0000',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '5px',
    textDecoration: 'none',
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    justifyContent: 'center',
  },
  // Desktop-specific overrides
  '@media (min-width: 768px)': {
    overlay: {
      flexDirection: 'row', // Row layout for desktop
      textAlign: 'left',
    },
    textContainer: {
      textAlign: 'left',
    },
  },
};

export default MovieDetail;
