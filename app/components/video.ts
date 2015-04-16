import React = require('react')
import { create } from 'react-free-style'
import videojs = require('video.js')

var Style = create()

var VIDEO_WRAPPER_STYLE = Style.registerStyle({
  flex: 1,
  padding: '2em',
  justifyContent: 'center',
  alignItems: 'center',

  '.video-js': {
    flex: 1
  },

  '.vjs-poster': {
    backgroundSize: 'cover'
  }
})

class Video extends React.Component<{ poster?: string, src: string}> {

  componentDidMount () {
    var target = this.refs.target.getDOMNode()
    var video = document.createElement('video')

    target.appendChild(video)
    video.src = this.props.src
    video.className = 'video-js vjs-default-skin vjs-big-play-centered'

    videojs(video, {
      controls: true,
      preload: 'auto',
      poster: this.props.poster,
      width: '100%',
      height: '100%'
    })
  }

  render () {
    return React.createElement('div', { ref: 'target', className: VIDEO_WRAPPER_STYLE.className })
  }

}

export default Style.component(Video)
