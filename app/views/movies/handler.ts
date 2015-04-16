import React = require('react')
import { create } from 'react-free-style'
import { List } from 'react-list'
import { createContainer } from 'marty'
import Spinner from '../../components/spinner'
import MoviesStore, { Summary } from './stores/movies'
import MoviesQueries from './queries/movies'
import MovieItem from './components/item'

var Style = create()

var LIST_STYLE = Style.registerStyle({
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '0 0.5em'
})

var LIST_CONTAINER_STYLE = Style.registerStyle({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
})

interface MoviesProps {
  movies: Summary[]
  isLoading: boolean
  count: number
  hasMore: boolean
}

interface ScrollListProps {
  isLoading: boolean
  loadMore: (from: number, size: number) => any
  hasMore: boolean
}

class MoviesView extends React.Component<MoviesProps, {}> {

  loading = false

  componentWillUpdate (nextProps: MoviesProps) {
    this.loading = nextProps.isLoading
  }

  render () {
    var length = this.props.movies.length

    return React.createElement(
      'div',
      { className: LIST_CONTAINER_STYLE.className },
      React.createElement(
        List,
        {
          itemsRenderer: (items: any[], ref: string) => {
            return React.createElement('div', { className: LIST_STYLE.className, ref }, items)
          },
          itemRenderer: (index: number, key: any) => {
            var movie = this.props.movies[index]

            if (index >= length) {
              if (!this.loading) {
                this.loading = true

                setImmediate(() => MoviesQueries.getPage(this.props.count, 50))
              }

              return null
            }

            return React.createElement(MovieItem, {
              key,
              imdbId: movie.imdbId,
              title: movie.title,
              cover: movie.cover
            })
          },
          length: length + (this.props.hasMore ? 1 : 0)
        }
      ),
      this.props.isLoading ? React.createElement(Spinner) : null
    )
  }

}

export default createContainer(Style.component(MoviesView), {
  listenTo: MoviesStore,
  fetch: {
    movies () {
      return MoviesStore.for(this).getMovies()
    },
    count () {
      return MoviesStore.for(this).getCount()
    },
    isLoading () {
      return MoviesStore.for(this).isLoading()
    },
    hasMore () {
      return MoviesStore.for(this).hasMore()
    }
  }
})
