const API = "https://deezer.humosoft.uz/chart"

const elArtistTemplate = document.querySelector("[data-artist-template]")
const elPlaylistTemplate = document.querySelector("[data-playlist-template]")
const elTrackTemplate = document.querySelector("[data-track-template]")
const elPodcastTemplate = document.querySelector("[data-podcast-template]")

const elArtistsWrapper = document.querySelector("[data-artists-wrapper]")
const elPlaylistsWrapper = document.querySelector("[data-playlists-wrapper]")
const elTracksWrapper = document.querySelector("[data-tracks-wrapper]")
const elTPodcastsWrapper = document.querySelector("[data-podcasts-wrapper]")

const elAudio = document.querySelector("[data-music]")
const ElSiteHeader = document.querySelector("[data-site-header]")



document.addEventListener("click", evt => {
  onPlayBtnClick(evt)
  onPauseBtnClick(evt)
})

// play button function 
function onPlayBtnClick(evt) {
  const elTarget = evt.target.closest("[data-play-btn]")

  if (!elTarget) return

  elTarget.style.display = "none"
  elTarget.nextElementSibling.style.display = "flex"

  if (elAudio.src !== elTarget.dataset.trackURL) {
    elAudio.src = elTarget.dataset.trackURL
  }

  if (elAudio.paused) {
    elAudio.play()
  }
}

// play button function 
function onPauseBtnClick(evt) {
  const elTarget = evt.target.closest("[data-pause-btn]")

  if (!elTarget) return

  elTarget.style.display = "none"
  elTarget.previousElementSibling.style.display = "flex"

  if (!elAudio.paused) {
    elAudio.pause()
  }
}

elAudio.addEventListener("ended", () => {
  const elPlayBtn = document.querySelectorAll("[data-play-btn]")
  const elPauseBtn = document.querySelectorAll("[data-pause-btn]")

  elPlayBtn.forEach(btn => {
    btn.style.display = "flex"
  });

  elPauseBtn.forEach(btn => {
    btn.style.display = "none"
  })
})

// Header scroll evt
window.addEventListener('scroll', () => {
  ElSiteHeader.classList.toggle('sticky', window.scrollY > 0);
});