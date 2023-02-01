const API = "https://deezer.humosoft.uz/chart"

const elArtistTemplate = document.querySelector("[data-artist-template]")
const elPlaylistTemplate = document.querySelector("[data-playlist-template]")
const elTrackTemplate = document.querySelector("[data-track-template]")
const elPodcastTemplate = document.querySelector("[data-podcast-template]")

const elAudio = document.querySelector("[data-music]")
const ElSiteHeader = document.querySelector("[data-site-header]")
const elLoader = document.querySelector("[data-loader]")
const elSearchTogglerBtn = document.querySelector("[data-search-toggler]")
const elSearchInput = document.querySelector("[data-search-input]")
const elLogo = document.querySelector("[data-logo]")


document.addEventListener("click", evt => {
  onPlayBtnClick(evt)
  onPauseBtnClick(evt)
  onSearchBtnClick(evt)
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

// Click search button
function onSearchBtnClick(evt) {
  const elTarget = evt.target.closest("[data-search-toggler]")

  if (!elTarget) return

  elTarget.querySelector("img").src = "images/icon-close.svg"
  elSearchInput.classList.toggle("show")
  elLogo.classList.remove("true")

  if (!elSearchInput.classList.contains("show")) {
    setTimeout(() => {
      elLogo.classList.add("true")
    }, 200)
    setTimeout(() => {
      elTarget.querySelector("img").src = "images/icon-search.svg"
    }, 700)
  }
}

// Audio ended
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

// Loader
function loader(state) {
  if (state) {
    elLoader.classList.remove("hidden")
  } else {
    elLoader.classList.add("hidden")
  }
}
