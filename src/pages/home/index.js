import React, { useEffect, useState } from 'react'
import './home.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import MovieList from '../../Components/movieList';
const Home = () => {
  const [popularMovies, setPopularMovies] = useState([])

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US")
      .then(res => res.json())
      .then(data => setPopularMovies(data.results))
  }, [])

  return (
    <div>
      <div className='posters'>
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={1}
          infiniteLoop={true}
          showStatus={false}
        >
          {
            popularMovies.map(
              (movie,i) => (
                <div key={i}>
                  <Link className='link' to={`/movie/${movie.id}`}>
                    <div className='poster-image-cover'>
                      <img className='poster-image' src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt={movie.original_title} />
                    </div>
                    <div className='poster-image-overlay'>
                      <div className='poster-image-title'>{movie?movie.original_title:''}</div>
                      <div className='poster-image-runtime'>
                        {movie ? movie.release_date : ''}
                        <span className='poster-image-rating'>
                          {movie ? movie.vote_average : ''}
                          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" style={{height:'1.2rem',marginLeft:'0.5rem'}} viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                          </svg>
                        </span>
                      </div>
                      <div className='poster-image-description'>
                        {movie ? movie.overview : ""}
                      </div>
                    </div>
                  </Link>
                </div>
              )
            )
          }
        </Carousel>
        <MovieList typeAssigned='upcoming'/>
        <MovieList typeAssigned='top_rated'/>
        <MovieList/>
      </div>
    </div>
  )
}

export default Home