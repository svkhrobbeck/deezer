const API = "https://deezer.humosoft.uz/chart"

const elArtistTemplate = document.querySelector("[data-artist-template]")
const elPlaylistTemplate = document.querySelector("[data-playlist-template]")
const elTrackTemplate = document.querySelector("[data-track-template]")

const elArtistsWrapper = document.querySelector("[data-artists-wrapper]")
const elPlaylistsWrapper = document.querySelector("[data-playlists-wrapper]")
const elTracksWrapper = document.querySelector("[data-tracks-wrapper]")

const elAudio = document.querySelector("[data-music]")


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

