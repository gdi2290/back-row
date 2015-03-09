var React = require('react')
var style = require('free-style')
var Colors = require('../constants/Colors')

var POSTER_STYLE = style.registerClass({
  height: '100%',
  flexShrink: 0
})

var IMAGE_STYLE = style.registerClass({
  height: '100%',
  borderRadius: 6
})

var MoviePoster = React.createClass({

  propTypes: {
    src: React.PropTypes.string.isRequired
  },

  render: function () {
    return (
      <div className={style.join(this.props.className, POSTER_STYLE.className)}>
        <img src={this.props.src} className={IMAGE_STYLE.className} />
      </div>
    )
  }

})

module.exports = MoviePoster
