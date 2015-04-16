import React = require('react')
import { create } from 'react-free-style'
import { Link } from 'react-router'
import moment = require('moment')
import titleCase = require('title-case')
import Button from '../../../components/button'
import Dropdown from '../../../components/dropdown'
import { Movie } from '../../../stores/movie'
import { Torrent } from '../../../stores/torrent'

var Style = create()

var MOVIE_TITLE_STYLE = Style.registerStyle({
  margin: '0 0 14px 0',
  fontWeight: 'bold',
  fontSize: '2.5em'
})

var MOVIE_META_STYLE = Style.registerStyle({
  flexDirection: 'row',
  marginBottom: '14px'
})

var MOVIE_META_ITEM_STYLE = Style.registerStyle({
  fontSize: '0.85em',
  fontWeight: 'bold',

  '& + &': {
    marginLeft: '1em'
  }
})

var MOVIE_DESCRIPTION_STYLE = Style.registerStyle({
  flex: 1,
  marginBottom: '14px',
  lineHeight: 1.2
})

var MOVIE_FOOTER_STYLE = Style.registerStyle({
  flexDirection: 'row',
  alignItems: 'center'
})

var MOVIE_FOOTER_ITEM_STYLE = Style.registerStyle({
  '& + &': {
    marginLeft: '1em'
  }
})

var MOVIE_HEADER_STYLE = Style.registerStyle({
  flexDirection: 'row',
  justifyContent: 'space-between',
  flexWrap: 'wrap'
})

var TORRENT_STYLE = Style.registerStyle({
  flex: '0 0 auto',
  marginBottom: '14px'
})

var TORRENT_SELECT_STYLE = Style.registerStyle({
  right: 0
})

var DOWNLOAD_ITEM_ANIM = Style.registerKeyframes({
  '0%, 20%, 75%, 100%': {
    WebkitTransform: 'translateY(0)',
    transform: 'translateY(0)'
  },
  '50%': {
    WebkitTransform: 'translateY(2px)',
    transform: 'translateY(2px)'
  },
  '40%': {
    WebkitTransform: 'translateY(-6px)',
    transform: 'translateY(-6px)'
  },
  '60%': {
    WebkitTransform: 'translateY(-3px)',
    transform: 'translateY(-3px)'
  }
})

var DOWNLOAD_ITEM_STYLE = Style.registerStyle({
  '&:hover > .fa': {
    WebkitAnimation: DOWNLOAD_ITEM_ANIM.name + ' 2s infinite',
    animation: DOWNLOAD_ITEM_ANIM.name + ' 2s infinite'
  }
})

interface MovieDetailsProps {
  movie: Movie
  torrent: Torrent
  torrents: Torrent[]
  selectTorrent: (item: Torrent) => any
  className: string
}

class MovieDetailsView extends React.Component<MovieDetailsProps, {}> {

  render () {
    var { movie, torrent } = this.props

    return React.createElement(
      'div',
      {
        className: this.props.className
      },
      React.createElement(
        'div',
        {
          className: MOVIE_HEADER_STYLE.className
        },
        React.createElement(
          'h2',
          {
            className: MOVIE_TITLE_STYLE.className
          },
          movie.title
        ),
        React.createElement(
          Dropdown,
          {
            className: TORRENT_STYLE.className,
            items: this.props.torrents,
            renderLabel: (item: Torrent) => item.quality,
            onChange: this.props.selectTorrent,
            dropdownClassName: TORRENT_SELECT_STYLE.className
          },
          React.createElement(
            Button,
            null,
            `Quality (${torrent.quality})`,
            React.createElement(
              'i',
              {
                className: 'fa fa-caret-down',
                style: { marginLeft: 10 }
              }
            )
          )
        )
      ),
      React.createElement(
        'div',
        {
          className: MOVIE_META_STYLE.className
        },
        React.createElement(
          'span',
          {
            className: MOVIE_META_ITEM_STYLE.className
          },
          moment(movie.released).format('MMM YY')
        ),
        movie.genres.length ? React.createElement(
          'span',
          {
            className: MOVIE_META_ITEM_STYLE.className
          },
          movie.genres.map(x => titleCase(x)).join(', ')
        ) : null,
        React.createElement(
          'span',
          {
            className: MOVIE_META_ITEM_STYLE.className
          },
          movie.runtime + ' min'
        ),
        React.createElement(
          'a',
          {
            className: MOVIE_META_ITEM_STYLE.className,
            href: `http://www.imdb.com/title/${movie.imdbId}/`,
            target: '_blank'
          },
          'View on IMDb'
        )
      ),
      React.createElement(
        'div',
        {
          className: MOVIE_DESCRIPTION_STYLE.className
        },
        movie.overview
      ),
      React.createElement(
        'div',
        {
          className: MOVIE_FOOTER_STYLE.className
        },
        React.createElement(
          Link,
          {
            className: MOVIE_FOOTER_ITEM_STYLE.className,
            to: 'movie',
            params: { imdbId: movie.imdbId }
          },
          React.createElement(Button, null, 'Watch Now')
        ),
        movie.trailer ? React.createElement(
          'a',
          {
            className: MOVIE_FOOTER_ITEM_STYLE.className,
            target: '_blank',
            href: movie.trailer
          },
          React.createElement(Button, null, 'Watch Trailer')
        ) : null,
        React.createElement(
          'a',
          {
            className: Style.join(
              MOVIE_FOOTER_ITEM_STYLE.className,
              DOWNLOAD_ITEM_STYLE.className
            ),
            href: torrent.url,
            target: '_blank',
            download: true
          },
          React.createElement('i', {
            className: 'fa fa-download',
            style: { marginRight: 10 }
          }),
          `Download (${torrent.quality})`
        )
      )
    )
  }

}

export default Style.component(MovieDetailsView)
