import React, { useEffect, useState } from 'react'
import './MovieDetail.css'
import { useParams } from 'react-router'
import MovieList from '../../Components/movieList'

const Movie = () => {
  const [currentMovieDetail, setMovie] = useState()
  const { id } = useParams()

  useEffect(() => {
    getData()
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    getData()
    window.scrollTo(0, 0)
  }, [id])

  const getData = () => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
      .then(res => res.json())
      .then(data => setMovie(data))
  }

  return (
    <div className='movie'>
      <div className='movie-intro'>
        <img className="movie-backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} alt='/' />
      </div>
      <div className='movie-details'>
        <div className='movie-details-left'>
          <div className='poster-box'>
            <img className="movie-poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} alt='/' />
          </div>
        </div>
        <div className='movie-details-right'>
          <div className='movie-details-right-top'>
            <div className="movie-name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
            <div className="movie-tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
            <div className='movie-rating'>
              {currentMovieDetail ? currentMovieDetail.vote_average : ""}
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" style={{ height: '.8rem', marginLeft: '0.5rem' }} viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
              <span className='movie-vote-count'>
                {currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}
              </span>
            </div>
            <div className="movie-runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
            <div className="movie-release-date">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
            <div className='movie-genres'>
              {
                currentMovieDetail && currentMovieDetail.genres
                  ?
                  currentMovieDetail.genres.map((genre, i) => (
                    <div key={i}><span className="movie-genre cursor-point" id={genre.id}>{genre.name}</span></div>
                  ))
                  :
                  ""
              }
            </div>
          </div>
          <div className='movie-details-right-bottom'>
            <div className="synopsis-text">Synopsis</div>
            <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
          </div>
        </div>
      </div>
      <div className='movie-details-page-bottom'>
        <div className='movie-links'>
          <div className='heading'>Useful Links</div>
          {
            currentMovieDetail && currentMovieDetail.homepage &&
            <a className='link' href={currentMovieDetail.homepage} target="_blank" rel="noreferrer">
              <p>
                <span className="movie-home-button movie-button">
                  Homepage
                  <i className="newTab fas fa-external-link-alt"></i>
                </span>
              </p>
            </a>
          }
          {
            currentMovieDetail && currentMovieDetail.imdb_id &&
            <a className='link' href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id} target="_blank" rel="noreferrer">
              <p>
                <span className="movie-imdb-button movie-button">
                  IMDb
                  <i className="newTab fas fa-external-link-alt"></i>
                </span>
              </p>
            </a>
          }
        </div>
        {
          (
            currentMovieDetail
            &&
            currentMovieDetail.production_companies.length >= 1
          ) ?
            <div className="heading">Production companies</div>
            : ''
        }

        <div className="production">
          {
            currentMovieDetail
            &&
            currentMovieDetail.production_companies
            &&
            currentMovieDetail.production_companies.map((company, i) => (
              <div key={i}>
                {company.logo_path
                  &&
                  <span className="production-company">
                    <img className="production-comapany-image" src={"https://image.tmdb.org/t/p/original" + company.logo_path} alt='' />
                    <span>{company.name}</span>
                  </span>}
              </div>
            ))
          }
        </div>
      </div>
      <MovieList />
      <MovieList typeAssigned='top_rated' />
      <MovieList typeAssigned='upcoming' />
    </div>
  )
}

export default Movie
