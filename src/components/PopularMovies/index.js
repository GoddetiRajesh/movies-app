import {Component} from 'react'
import Loader from 'react-loader-spinner'

import MovieCard from '../MovieCard'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
}

class PopularMovies extends Component {
  state = {apiStatus: apiStatusConstants.initial, popularMoviesData: []}

  componentDidMount() {
    this.getpopularMoviesData()
  }

  getpopularMoviesData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=4b6447742932745f75f6186d51933b0b&language=en-US&page=1`,
    )
    const data = await response.json()
    if (response.ok) {
      const {results} = data
      const updatedData = results.map(eachItem => ({
        adult: eachItem.adult,
        backdropPath: eachItem.backdrop_path,
        genreIds: eachItem.genre_ids,
        id: eachItem.id,
        originalLanguage: eachItem.original_language,
        originalTitle: eachItem.original_title,
        overview: eachItem.overview,
        popularity: eachItem.popularity,
        posterPath: eachItem.poster_path,
        releaseDate: eachItem.release_date,
        title: eachItem.title,
        video: eachItem.video,
        voteAverage: eachItem.vote_average,
        voteCount: eachItem.vote_count,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        popularMoviesData: updatedData,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#00306e" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {popularMoviesData} = this.state

    return (
      <>
        <h1 className="title">Popular Movies</h1>
        <ul className="popular-list-container">
          {popularMoviesData.map(eachItem => (
            <MovieCard key={eachItem.id} movieDetails={eachItem} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderSuccessView()
      default:
        return this.renderLoadingView()
    }
  }
}

export default PopularMovies
