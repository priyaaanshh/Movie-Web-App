import React, { useEffect, useState } from "react"
import './Card.css'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import { Link } from "react-router-dom"


const Card = ({ movie }) => {

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1)
  }, [])

  return (
    <div>
      {isLoading ?
        <div className="card cursor-point">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
        :
        <Link className="link" to={`/movie/${movie.id}`}>
          <div className="card cursor-point">
            <img className="card-image" src={`https://image.tmdb.org/t/p/original${movie && movie.poster_path}`} alt='/' />
            <div className="card-image-overlay">
              <div className="card-title">{movie ? movie.original_title : ''}</div>
              <div className="card-runtime">
                {movie ? movie.release_date : ""}
                <span className='card-rating'>
                  {movie ? movie.vote_average : ''}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" style={{ height: '.65rem', marginLeft: '0.5rem' }} viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                </span>
              </div>
              <div className="card-description">{movie ? movie.overview.slice(0, 118) + "..." : ""}</div>
            </div>
          </div>
        </Link>
      }
    </div>
  )
}

export default Card;