import React = require('react')
import { create } from 'react-free-style'
import { createContainer } from 'marty'
import Spinner from '../../components/spinner'
import MovieStore, { Movie } from '../../stores/movie'
import TorrentStore, { Torrent } from '../../stores/torrent'
import MoviePoster from './components/poster'
import MovieDetails from './components/details'

var Style = create()

var CONTAINER_STYLE = Style.registerStyle({
  flex: 1,
  backgroundColor: '#000',
  justifyContent: 'center'
})

var BACKGROUND_STYLE = Style.registerStyle({
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  opacity: 0.3,
  backgroundSize: 'cover',
  backgroundPosition: 'center'
})

var MOVIE_PAGE_STYLE = Style.registerStyle({
  flex: '0 1 auto',
  flexDirection: 'column',
  alignSelf: 'center',

  '@media (min-width: 680px)': {
    maxWidth: 980,
    flexDirection: 'row'
  }
})

var MOVIE_POSTER_STYLE = Style.registerStyle({
  padding: '1em',
  maxHeight: 280,
  height: 'calc(100vh - 34px)',

  '@media (min-width: 680px)': {
    maxHeight: 500
  }
})

var MOVIE_DETAILS_STYLE = Style.registerStyle({
  flex: 1,
  padding: '1em'
})

interface MovieProps {
  movie: Movie
  torrents: Torrent[]
}

interface MovieState {
  torrent?: Torrent
}

class MovieView extends React.Component<MovieProps, MovieState> {

  componentWillMount () {
    console.log(this.props)

    this.setState({ torrent: this.props.torrents[0] })
  }

  render () {
    var { movie, torrents } = this.props

    return React.createElement(
      'div',
      {
        className: CONTAINER_STYLE.className
      },
      React.createElement(
        'div',
        {
          className: BACKGROUND_STYLE.className,
          style: {
            backgroundImage: Style.url(movie.backgroundImage)
          }
        }
      ),
      React.createElement(
        'div',
        {
          className: MOVIE_PAGE_STYLE.className
        },
        React.createElement(
          MoviePoster,
          {
            src: movie.posterImage,
            className: MOVIE_POSTER_STYLE.className
          }
        ),
        React.createElement(
          MovieDetails,
          {
            movie: movie,
            torrent: this.state.torrent,
            torrents: torrents,
            selectTorrent: (torrent: Torrent) => this.setState({ torrent }),
            className: MOVIE_DETAILS_STYLE.className
          }
        )
      )
    )
  }

}

export default createContainer(Style.component(MovieView), {
  listenTo: [MovieStore, TorrentStore],
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  fetch: {
    movie () {
      var { imdbId } = this.context.router.getCurrentParams()

      return MovieStore.for(this).getMovie(imdbId)
    },
    torrents () {
      var { imdbId } = this.context.router.getCurrentParams()

      return TorrentStore.for(this).getMovie(imdbId)
    }
  },
  pending () {
    return React.createElement(Spinner)
  }
})
