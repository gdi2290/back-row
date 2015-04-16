import { register, Queries } from 'marty'
import { yts } from '../utils/request'
import TorrentConstants from '../constants/torrent'

class TorrentQueries extends Queries {

  getMovie (imdbId: string) {
    this.dispatch(TorrentConstants.RECEIVE_YTS_QUERY_STARTING, imdbId)

    return yts(`/v2/list_movies.json?query_term=${imdbId}`)
      .then((res) => this.dispatch(TorrentConstants.RECEIVE_YTS_QUERY, imdbId, res.body))
      .catch((err) => this.dispatch(TorrentConstants.RECEIVE_YTS_QUERY_FAILED, imdbId, err))
  }

}

export default register(TorrentQueries)
