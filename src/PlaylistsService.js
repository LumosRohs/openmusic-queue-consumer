const { Pool } = require('pg')

class PlaylistsService {
  constructor () {
    this._pool = new Pool()
  }

  async getPlaylists (playlistId) {
    const query = {
      text: 'SELECT id, name FROM playlists WHERE id = $1',
      values: [playlistId]
    }
    const { rows } = await this._pool.query(query)

    const query2 = {
      text: 'SELECT songs.id, songs.title, songs.performer FROM songs INNER JOIN playlist_songs ON songs.id = playlist_songs.song_id WHERE playlist_songs.playlist_id = $1',
      values: [playlistId]
    }
    const result = await this._pool.query(query2)

    return {
      playlists: {
        id: rows[0].id,
        name: rows[0].name,
        songs: result.rows
      }
    }
  }
}

module.exports = PlaylistsService
