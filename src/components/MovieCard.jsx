// src/components/MovieCard.jsx
import React from 'react';

const MovieCard = ({ movie, onClick }) => (
  <div onClick={onClick} style={styles.card}>
    <img
      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      alt={movie.title}
      style={styles.image}
    />
    <h3 style={styles.title}>{movie.title}</h3>
  </div>
);

const styles = {
  card: {
    width: '100%', // Full width on mobile
    maxWidth: '300px', // Restrict width on desktop
    cursor: 'pointer',
    textAlign: 'center',
    margin: '20px auto', // Centered on mobile
  },
  image: {
    width: '100%',
    borderRadius: '8px',
  },
  title: {
    fontSize: '18px',
    color: '#fff',
    marginTop: '10px',
  },
};

export default MovieCard;
