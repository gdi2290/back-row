import React = require('react')
import { create } from 'react-free-style'

var Style = create()

var POSTER_STYLE = Style.registerStyle({
  flex: '0 1 auto',
  alignItems: 'center',
  justifyContent: 'center'
})

var CONTAINER_STYLE = Style.registerStyle({
  height: '100%'
})

var IMAGE_STYLE = Style.registerStyle({
  borderRadius: 3,
  maxHeight: '100%',
  maxWidth: '100%'
})

interface MoviePosterProps {
  src: string
  className: string
}

class MoviePosterView extends React.Component<MoviePosterProps, {}> {

  render () {
    return React.createElement(
      'div',
      {
        className: Style.join(this.props.className, POSTER_STYLE.className)
      },
      React.createElement(
        'div',
        {
          className: CONTAINER_STYLE.className
        },
        React.createElement(
          'img',
          {
            src: this.props.src,
            className: IMAGE_STYLE.className
          }
        )
      )
    )
  }

}

export default Style.component(MoviePosterView)
