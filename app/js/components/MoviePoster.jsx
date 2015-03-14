var React = require('react')
var Style = require('react-free-style').fresh()
var Colors = require('../constants/Colors')

var POSTER_STYLE = Style.registerClass({
  height: '100%',
  flexShrink: 0
})

var IMAGE_STYLE = Style.registerClass({
  height: '100%',
  borderRadius: 6
})

var MoviePoster = React.createClass({

  mixins: [Style.Mixin],

  propTypes: {
    src: React.PropTypes.string.isRequired
  },

  render: function () {
    return (
      <div className={Style.join(this.props.className, POSTER_STYLE.className)}>
        <img src={this.props.src} className={IMAGE_STYLE.className} />
      </div>
    )
  }

})

module.exports = MoviePoster
