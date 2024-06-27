import './index.css'

const CastDetails = props => {
  const {castDetails} = props
  const {name, profilePath, character} = castDetails
  return (
    <li className="cast-item-container">
      <h1 className="cast-name">{name}</h1>
      <img
        className="cast-image"
        src={`https://image.tmdb.org/t/p/w500/${profilePath}`}
        alt="cast"
      />
      <p className="cast-para">
        Character: <span className="char">{character}</span>
      </p>
    </li>
  )
}

export default CastDetails
