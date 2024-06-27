import {Link} from 'react-router-dom'

import './index.css'

const GlobalNavbar = props => {
  const {searchValue, updateSearchValue} = props
  const onChangeSearchValue = event => {
    updateSearchValue(event)
  }

  return (
    <nav className="header-container">
      <h1 className="logo-title">movieDB</h1>
      <ul className="nav-list-container">
        <Link to="/" className="link-container">
          <li>
            <button type="button" className="nav-items">
              Popular
            </button>
          </li>
        </Link>
        <Link to="/top-rated" className="link-container">
          <li>
            <button type="button" className="nav-items">
              Top Rated
            </button>
          </li>
        </Link>
        <Link to="/upcoming" className="link-container">
          <li>
            <button type="button" className="nav-items">
              Upcoming
            </button>
          </li>
        </Link>
      </ul>
      <div className="search-container">
        <input
          onChange={onChangeSearchValue}
          type="search"
          placeholder="Enter Movie Name"
          value={searchValue}
          className="search-input"
        />
        <Link to="/searched-movies">
          <button type="button" className="search-button">
            Search
          </button>
        </Link>
      </div>
    </nav>
  )
}

export default GlobalNavbar
