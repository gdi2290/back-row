import { Store, register } from 'marty'
import MoviesQueries from '../queries/movies'
import MoviesConstants from '../constants/movies'

export interface Summary {
  title: string
  cover: string
  imdbId: string
}

export interface MoviesState {
  list: string[]
  loading: boolean
  count: number
  total: number
  exists: {
    [id: string]: boolean
  }
  summaries: {
    [id: string]: Summary
  }
}

class MoviesStore extends Store<MoviesState> {
  state: MoviesState = {
    total: 0,
    count: -1,
    list: [],
    exists: {},
    loading: false,
    summaries: {}
  }

  handlers = {
    addPage: MoviesConstants.RECIEVE_YTS_PAGE,
    endLoading: [MoviesConstants.RECIEVE_YTS_PAGE, MoviesConstants.RECIEVE_YTS_PAGE_FAILED],
    startLoading: MoviesConstants.RECIEVE_YTS_PAGE_STARTING
  }

  getMovies (): Summary[] {
    return this.state.list.map((id) => this.state.summaries[id])
  }

  getCount (): number {
    return this.state.count
  }

  getTotal (): number {
    return this.state.total
  }

  hasMore (): boolean {
    return this.state.count < this.state.total
  }

  isLoading (): boolean {
    return this.state.loading
  }

  startLoading (): void {
    this.state.loading = true
    this.hasChanged()
  }

  endLoading (): void {
    this.state.loading = false
    this.hasChanged()
  }

  addPage (page: number, body: any) {
    var { exists, summaries, list } = this.state

    this.state.total = body.data.movie_count
    this.state.count = body.data.page_number * body.data.limit

    body.data.movies.forEach((movie: any) => {
      var imdbId = movie.imdb_code

      if (exists[imdbId]) {
        return
      }

      exists[imdbId] = true
      list.push(imdbId)

      summaries[imdbId] = {
        imdbId,
        title: movie.title,
        cover: movie.medium_cover_image
      }
    })

    this.hasChanged()
  }
}

export default register(MoviesStore)