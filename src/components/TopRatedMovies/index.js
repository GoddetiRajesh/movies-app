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

const listpages = []
for (let i = 1; i <= 20; i += 1) {
  listpages.push(i)
}

class TopRatedMovies extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    topRatedMoviesData: [],
    pageNo: 1,
    totalPages: 0,
    pagesList: listpages,
  }

  componentDidMount() {
    this.getTopRatedMoviesData()
  }

  getTopRatedMoviesData = async () => {
    const {pageNo} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=4b6447742932745f75f6186d51933b0b&language=en-US&page=${pageNo}`,
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

      this.setState({
        apiStatus: apiStatusConstants.success,
        topRatedMoviesData: updatedData,
        totalPages,
      })
    }
  }

  updatedPageNo = no => {
    this.setState({pageNo: no}, this.getTopRatedMoviesData)
  }

  goToPrevPage = () => {
    const {totalPages, pagesList, pageNo} = this.state
    if (pageNo < totalPages && pageNo > 1) {
      if (pagesList[0] === pageNo) {
        const list = []
        for (let i = pageNo - 20; i <= pageNo - 1; i += 1) {
          list.push(i)
        }
        this.setState(
          prevState => ({
            pageNo: prevState.pageNo - 1,
            pagesList: list,
          }),
          this.getTopRatedMoviesData,
        )
      } else {
        this.setState(
          prevState => ({
            pageNo: prevState.pageNo - 1,
          }),
          this.getTopRatedMoviesData,
        )
      }
    }
  }

  goToNextPage = () => {
    const {totalPages, pagesList, pageNo} = this.state
    if (pageNo < totalPages) {
      if (pagesList[pagesList.length - 1] === pageNo) {
        const list = []
        for (let i = pageNo + 1; i <= pageNo + 20; i += 1) {
          list.push(i)
        }
        this.setState(
          prevState => ({
            pageNo: prevState.pageNo + 1,
            pagesList: list,
          }),
          this.getTopRatedMoviesData,
        )
      } else {
        this.setState(
          prevState => ({
            pageNo: prevState.pageNo + 1,
          }),
          this.getTopRatedMoviesData,
        )
      }
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#00306e" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {topRatedMoviesData, pagesList, pageNo} = this.state

    return (
      <>
        <h1 className="title">Top Rated Movies</h1>
        <ul className="top-list-container">
          {topRatedMoviesData.map(eachItem => (
            <MovieCard key={eachItem.id} movieDetails={eachItem} />
          ))}
        </ul>
        <ul className="pages-list-container">
          <li>
            <button
              onClick={this.goToPrevPage}
              type="button"
              className="custom-button"
            >
              Prev
            </button>
          </li>
          {pagesList.map(eachItem => (
            <Pages
              key={eachItem}
              pageNo={eachItem}
              no={pageNo}
              updatedPageNo={this.updatedPageNo}
            />
          ))}
          <li>
            <button
              onClick={this.goToNextPage}
              type="button"
              className="custom-button"
            >
              Next
            </button>
          </li>
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

export default TopRatedMovies
