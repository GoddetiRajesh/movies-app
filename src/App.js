import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import GlobalNavbar from './components/GlobalNavbar'
import PopularMovies from './components/PopularMovies'
import TopRatedMovies from './components/TopRatedMovies'
import UpcomingMovies from './components/UpcomingMovies'
import SingleMovieDetails from './components/SingleMovieDetails'
import SearchedMovies from './components/SearchedMovies'

import './App.css'

class App extends Component {
  state = {searchValue: ''}

  updateSearchValue = event => {
    this.setState({searchValue: event.target.value})
  }

  render() {
    const {searchValue} = this.state
    return (
      <>
        <GlobalNavbar
          searchValue={searchValue}
          updateSearchValue={this.updateSearchValue}
        />
        <Switch>
          <Route exact path="/" component={PopularMovies} />
          <Route exact path="/top-rated" component={TopRatedMovies} />
          <Route exact path="/upcoming" component={UpcomingMovies} />
          <Route
            exact
            path="/movie-details/:id"
            component={SingleMovieDetails}
          />
          <Route
            exact
            path="/searched-movies"
            render={props => (
              <SearchedMovies {...props} searchValue={searchValue} />
            )}
          />
        </Switch>
      </>
    )
  }
}

export default App
