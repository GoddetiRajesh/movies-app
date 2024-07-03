import {Component} from 'react'
import Loader from 'react-loader-spinner'

import MovieCard from '../MovieCard'
import Pages from '../Pages'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
}

class PopularMovies extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    popularMoviesData: [],
    pageNo: 1,
    totalPages: 0,
  }

  componentDidMount() {
    this.getpopularMoviesData()
  }

  getpopularMoviesData = async () => {
    const {pageNo} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=4b6447742932745f75f6186d51933b0b&language=en-US&page=${pageNo}`,
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

      let totalPages = data.total_pages
      if (totalPages > 500) {
        totalPages = 500
      }
      const totalPagesList = []
      for (let i = 1; i <= totalPages; i += 1) {
        totalPagesList.push(i)
      }

      this.setState({
        apiStatus: apiStatusConstants.success,
        popularMoviesData: updatedData,
        totalPages: totalPagesList,
      })
    }
  }

  updatedPageNo = no => {
    this.setState({pageNo: no}, this.getpopularMoviesData)
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#00306e" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {popularMoviesData, totalPages} = this.state

    return (
      <>
        <h1 className="title">Popular Movies</h1>
        <ul className="popular-list-container">
          {popularMoviesData.map(eachItem => (
            <MovieCard key={eachItem.id} movieDetails={eachItem} />
          ))}
        </ul>
        <ul className="pages-list-container">
          {totalPages.map(eachItem => (
            <Pages
              key={eachItem}
              pageNo={eachItem}
              updatedPageNo={this.updatedPageNo}
            />
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
