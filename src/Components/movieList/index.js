import React, { useEffect, useState } from 'react'
import './MovieList.css'
import { useParams } from 'react-router-dom'
import Card from '../card'

const MovieList = ({typeAssigned}) => {

  const [movieList, setMovieList] = useState([])
  const { type } = useParams()

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    getData()
  }, [type])

  const getData = () => {
    fetch(`https://api.themoviedb.org/3/movie/${type ? type : (typeAssigned?typeAssigned:'popular')}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
      .then(res => res.json())
      .then(data => setMovieList(data.results))
  }

  return (
    <div className='movie-list'>
      <h2 className='list-title'>{(type ? type :(typeAssigned?typeAssigned:'popular')).toUpperCase()}</h2>
      <div className='list-cards'>
        {
          movieList.map(
            (movie,i) => (
              <Card movie={movie} key={i}/>
            )
          )
        }
      </div>
    </div>
  )
}

export default MovieList
