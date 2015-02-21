var React = require('react')
var State = require('react-router').State
var RouteHandler = require('react-router').RouteHandler
var style = require('free-style')
var MoviesStore = require('../stores/MoviesStore')
var PageActions = require('../actions/PageActions')
var MovieActions = require('../actions/MovieActions')
var resizeImage = require('../utils/resize-image')

function getStateFromStores (imdbId) {
  return {
    movie: MoviesStore.get(imdbId)
  }
}

var BACKGROUND_STYLE = style({
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  opacity: 0.35,
  backgroundSize: 'cover',
  backgroundPosition: 'center'
})

var MoviePage = React.createClass({

  mixins: [State, MoviesStore.Mixin],

  getInitialState: function () {
    return getStateFromStores(this.getParams().imdbId)
  },

  onChange: function () {
    this.setState(getStateFromStores(this.getParams().imdbId))
  },

  componentWillMount: function () {
    MovieActions.getMovie(this.getParams().imdbId)
  },

  render: function () {
    var movie = this.state.movie

    PageActions.setTitle(movie ? movie.title : 'Loading...')

    // TODO: Render loading indicator.
    if (!movie) {
      return <div />
    }

    var backdropImage = resizeImage(movie.backgroundImage, window.innerWidth)

    var backgroundStyle = style(BACKGROUND_STYLE, {
      backgroundImage: style.url(backdropImage)
    })

    return (
      <div style={style({ flex: 1 })}>
        <div style={backgroundStyle} />

        <RouteHandler movie={movie} />
      </div>
    )
  }

})

module.exports = MoviePage