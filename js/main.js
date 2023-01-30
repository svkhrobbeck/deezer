const API = "https://deezer.humosoft.uz/chart"

const elArtistTemplate = document.querySelector("[data-artist-template]")
const elPlaylistTemplate = document.querySelector("[data-playlist-template]")
const elTrackTemplate = document.querySelector("[data-track-template]")

const elArtistsWrapper = document.querySelector("[data-artists-wrapper]")
const elPlaylistsWrapper = document.querySelector("[data-playlists-wrapper]")
const elTracksWrapper = document.querySelector("[data-tracks-wrapper]")

const elAudio = document.querySelector("[data-music]")

// GetData function
async function getData(resource) {
  const res = await fetch(resource)
  const searchResult = await res.json()
  renderArtists(searchResult.artists.data)
  renderPlaylists(searchResult.playlists.data)
  renderTracks(searchResult.tracks.data)
}
getData(API)

// Render Artists function
function renderArtists(artists) {

  artists.forEach(artist => {
    const elArtistCard = elArtistTemplate.content.cloneNode(true)
    const elArtistCardImg = elArtistCard.querySelector("[data-artist-img]")

    elArtistCardImg.src = artist.picture_big
    elArtistCardImg.width = 250
    elArtistCardImg.height = 250
    elArtistCard.querySelector("[data-artist-name]").textContent = artist.name
    elArtistCard.querySelector("[data-artist-job-text]").textContent = artist.type

    elArtistsWrapper.appendChild(elArtistCard)
  })
}

// Render Playlists function
function renderPlaylists(playlists) {

  playlists.forEach(playlist => {
    const elPlaylistCard = elPlaylistTemplate.content.cloneNode(true)
    const elPlaylistCardImg = elPlaylistCard.querySelector("[data-playlist-img]")

    elPlaylistCardImg.src = playlist.picture_big
    elPlaylistCardImg.width = 250
    elPlaylistCardImg.height = 250
    elPlaylistCard.querySelector("[data-playlist-title]").textContent = playlist.title
    elPlaylistCard.querySelector("[data-playlist-type-text]").textContent = playlist.type

    elPlaylistsWrapper.appendChild(elPlaylistCard)
  })
}

// Render tracks function
function renderTracks(tracks) {

  tracks.forEach(track => {
    const elTrackCard = elTrackTemplate.content.cloneNode(true)
    const elTrackCardImg = elTrackCard.querySelector("[data-track-img]")

    elTrackCardImg.src = track.artist.picture_big
    elTrackCardImg.width = 250
    elTrackCardImg.height = 250
    elTrackCard.querySelector("[data-track-title]").textContent = track.title
    elTrackCard.querySelector("[data-track-type-text]").textContent = track.type
    elTrackCard.querySelector("[data-play-btn]").dataset.trackURL = track.preview

    elTracksWrapper.appendChild(elTrackCard)
  })
}

document.addEventListener("click", evt => {
  onPlayBtnClick(evt)
})

// play button function 
function onPlayBtnClick(evt) {
  const elTarget = evt.target.closest("[data-play-btn]")

  if (!elTarget) return

  if (elAudio.src !== elTarget.dataset.trackURL) {
    elAudio.src = elTarget.dataset.trackURL
  }

  if (elAudio.paused) {
    elAudio.play()
  } else {
    elAudio.pause()
  }
}