import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div className='header '>
      <div className='header-left '>
        <Link to="/"><img className='header-icon' src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png' alt='iconHere'/></Link>
        <Link className='link cursor-point header-btn' to='/movies/popular'>Popular</Link>
        <Link className='link cursor-point header-btn' to='/movies/top_rated'>Top Rated</Link>
        <Link className='link cursor-point header-btn' to='/movies/upcoming'>Upcoming</Link>
      </div>
    </div>
  )
}

export default Header
