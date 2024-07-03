import {Component} from 'react'
import Loader from 'react-loader-spinner'

import CastDetails from '../CastDetails'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
}

class SingleMovieDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, movieData: {}, castData: []}

  componentDidMount() {
    this.getmovieData()
    this.getCastData()
  }

  getmovieData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=4b6447742932745f75f6186d51933b0b&language=en-US`,
    )
    const data = await response.json()
    if (response.ok) {
      const updatedData = {
        genres: data.genres.map(eachValue => ({
          id: eachValue.id,
          name: eachValue.name,
        })),
        id: data.id,
        overview: data.overview,
        posterPath: data.poster_path,
        releaseDate: data.release_date,
        runtime: data.runtime,
        title: data.title,
        voteAverage: data.vote_average,
      }

      this.setState({
        apiStatus: apiStatusConstants.success,
        movieData: updatedData,
      })
    }
  }

  getCastData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=4b6447742932745f75f6186d51933b0b&language=en-US`,
    )
    const data = await response.json()
    if (response.ok) {
      const {cast} = data
      const updatedData = cast.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        profilePath: eachItem.profile_path,
        character: eachItem.character,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        castData: updatedData,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#00306e" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {movieData, castData} = this.state
    const {
      genres,
      overview,
      posterPath,
      releaseDate,
      runtime,
      title,
      voteAverage,
    } = movieData

    return (
      <>
        <div className="mv-details-container">
          <h1 className="mv-title">{title}</h1>
          <img
            className="mv-image"
            src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
            alt={title}
          />
          <div className="mv-details">
            <p className="para">
              Release Date: <span className="mv-color">{releaseDate}</span>
            </p>
            <p className="para">
              Duration: <span className="mv-color">{runtime}min</span>
            </p>
            <p className="para">
              Ratings: <span className="mv-color">{voteAverage}</span>
            </p>
          </div>
          <h1 className="mv-title">Genres</h1>
          <ul className="mv-genres">
            {genres.map(eachItem => (
              <li key={eachItem.id} className="para">
                {eachItem.name}
              </li>
            ))}
          </ul>
          <h1 className="mv-title">OverView</h1>
          <p className="mv-overview">{overview}</p>
        </div>
        <div className="cast-details-container">
          <hr />
          <h1 className="mv-title">Cast Details</h1>
          <ul className="cast-list-container">
            {castData.map(eachItem => (
              <CastDetails key={eachItem.id} castDetails={eachItem} />
            ))}
          </ul>
        </div>
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

export default SingleMovieDetails
