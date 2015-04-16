import React = require('react')
import { Route, Redirect, run } from 'react-router'

import App from './views/app/handler'
import Movies from './views/movies/handler'
import Movie from './views/movie/handler'

var routes = React.createElement(
  Route,
  { name: 'app', path: '/', handler: App },
  React.createElement(Redirect, { path: '/', to: 'movies' }),
  React.createElement(Route, { name: 'movies', path: 'movies', handler: Movies }),
  React.createElement(Route, { name: 'movie', path: 'movies/:imdbId', handler: Movie })
)

export function attach (element: HTMLElement): void {
  run(routes, function (Handler) {
    React.render(React.createElement(Handler), element)
  })
}
