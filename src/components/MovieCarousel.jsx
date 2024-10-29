import React, { useState, useEffect, useCallback } from 'react';
import { FaStar, FaFilm } from 'react-icons/fa';

const MovieCarousel = ({ movies }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Update the carousel active item when a poster is clicked
  const handlePosterClick = (index) => {
    setActiveIndex(index);
  };

  // Function to handle mouse wheel scrolling for the poster slider
  const handleScroll = (event) => {
    event.preventDefault(); // Prevent default scrolling behavior
    const scrollAmount = event.deltaY > 0 ? 100 : -100; // Scroll amount for each wheel movement
    const slider = document.querySelector('.poster-slider');
    if (slider) {
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' }); // Scroll horizontally
    }
  };

  // Check if the device is mobile
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth <= 768); // Adjust the width threshold as needed
  }, []);

  useEffect(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile); // Update on resize

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [checkMobile]);

  return (
    <div id="carouselExample" className="carousel slide movie-carousel" style={{width:'100%'}}>
      <div className="carousel-inner">
        {movies.map((movie, index) => (
          <div
            className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
            key={movie.id}
            style={{ position: 'relative' }}
          >
            {/* Main carousel image */}
            <img
              src={`https://image.tmdb.org/t/p/${isMobile ? 'w200' : 'original'}${isMobile ? movie.poster_path : movie.backdrop_path}`}
              className="d-block w-100"
              alt={movie.title}
              style={{
                maxHeight: isMobile ? '400px' : '750px',
                objectFit: 'cover',
                filter: 'brightness(80%) blur(0.5px)',
              }}
            />
            
            {/* Dark overlay */}
            <div className="carousel-overlay"></div>


            {/* Full details for larger screens */}
            {!isMobile && (
              <div className="carousel-caption d-none d-md-block " style={{ textAlign: 'left', top: '20%' }}>
                <h1>{movie.title}</h1>
                
                {/* Genre and Rating */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FaFilm color="#f8e825" size={18} />
                  <span>{movie.genre_ids?.join(', ')}</span> {/* Replace with mapped genres */}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px' }}>
                  <span>Rating: </span>
                  {Array(Math.round(movie.vote_average / 2))
                    .fill()
                    .map((_, i) => (
                      <FaStar key={i} color="#FFD700" size={16} />
                    ))}
                </div>
                
                <p>{movie.overview}</p>
                
                <a
                  href={`https://www.youtube.com/results?search_query=${movie.title} trailer`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ backgroundColor: '#ff0000', color: '#fff' }}
                >
                  Watch Trailer
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Scrollable Poster Thumbnails */}
      {!isMobile && ( // Only render the poster slider on larger screens
        <div
          className="poster-slider"
          style={posterSliderStyles}
          onWheel={handleScroll} // Add the mouse wheel event handler
        >
          {movies.map((movie, index) => (
            <img
              key={movie.id}
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              onClick={() => handlePosterClick(index)}
              style={{
                ...posterStyle,
                border: index === activeIndex ? '2px solid #fff' : 'none',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Styles for the poster slider and individual poster images
const posterSliderStyles = {
  display: 'flex',
  overflowX: 'hidden', // Hide scrollbar but allow scrolling
  width: '50%', // Set the width to 50% of the container
  position: 'absolute',
  bottom: '20px',
  left: '50%', // Center from the middle of the container
  transform: 'translateX(-50%)', // Adjust to center precisely
  gap: '10px',
  padding: '10px',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  borderRadius: '8px',
  zIndex: '10', // Ensure the poster slider is in the foreground
};

// Hide the scrollbar for WebKit-based browsers
const posterStyle = {
  width: '80px',
  height: '120px',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default MovieCarousel;
