import {Component} from 'react'
import Loader from 'react-loader-spinner'

import MovieCard from '../MovieCard'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
}

class UpcomingMovies extends Component {
  state = {apiStatus: apiStatusConstants.initial, upcomingMoviesData: []}

  componentDidMount() {
    this.getUpcomingMoviesData()
  }

  getUpcomingMoviesData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=4b6447742932745f75f6186d51933b0b&language=en-US&page=1`,
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
        poster_path: eachItem.poster_path,
        releaseDate: eachItem.release_date,
        title: eachItem.title,
        video: eachItem.video,
        voteAverage: eachItem.vote_average,
        voteCount: eachItem.vote_count,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        upcomingMoviesData: updatedData,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#00306e" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {upcomingMoviesData} = this.state

    return (
      <>
        <h1 className="title">Upcoming Movies</h1>
        <ul className="upcoming-list-container">
          {upcomingMoviesData.map(eachItem => (
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

export default UpcomingMovies
