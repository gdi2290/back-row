import { Store, register } from 'marty'
import TorrentQueries from '../queries/torrent'
import TorrentConstants from '../constants/torrent'
import MoviesConstants from '../views/movies/constants/movies'

export interface Torrent {
  hash: string
  uploaded: number
  peers: number
  seeds: number
  quality: string
  size: number
  url: string
}

export interface TorrentState {
  movies: {
    [imdbId: string]: Torrent[]
  }
}

class TorrentStore extends Store<TorrentState> {

  state: TorrentState = {
    movies: {}
  }

  handlers = {
    addTorrent: [MoviesConstants.RECIEVE_YTS_PAGE, TorrentConstants.RECEIVE_YTS_QUERY]
  }

  getMovie (imdbId: string) {
    return this.fetch({
      id: imdbId,
      locally: () => {
        return this.state.movies[imdbId]
      },
      remotely: () => {
        return TorrentQueries.getMovie(imdbId)
      }
    })
  }

  addTorrent (_: any, body: any) {
    body.data.movies.forEach((movie: any) => {
      this.state.movies[movie.imdb_code] = movie.torrents.map((torrent: any) => {
        return {
          hash: torrent.hash,
          uploaded: torrent.date_uploaded_unix,
          peers: torrent.peers,
          seeds: torrent.seeds,
          quality: torrent.quality,
          size: torrent.size_bytes,
          url: torrent.url
        }
      })
    })

    this.hasChanged()
  }

}

export default register(TorrentStore)
