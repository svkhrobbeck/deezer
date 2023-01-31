const API_PLAYLIST = "https://deezer.humosoft.uz/playlist"
const playlistId = new URLSearchParams(window.location.search).get("id")
console.log(playlistId);

async function getPlaylistData(resource, id) {
  const res = await fetch(`${resource}/${id}`)
  const searchResult = await res.json()

  const resPlaylists = await fetch(`${resource}/${id}/top?limit=50`)
  const searchPlaylistsResult = await resPlaylists.json()
}

getPlaylistData(API_PLAYLIST, playlistId)