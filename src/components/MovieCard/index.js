import {Link} from 'react-router-dom'

import './index.css'

const MoviesCard = props => {
  const {movieDetails} = props
  const {title, voteAverage, posterPath, id} = movieDetails

  return (
    <li className="movie-card-item">
      <img
        className="movie-image"
        src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
        alt="poster_path"
      />
      <div className="details-container">
        <h1 className="movie-title">{title}</h1>
        <p className="movie-rating">Ratings: {voteAverage}</p>
        <Link to={`/movie-details/${id}`}>
          <button type="button" className="view-details-button">
            View Details
          </button>
        </Link>
      </div>
    </li>
  )
}

export default MoviesCard
