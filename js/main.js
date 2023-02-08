const API = "https://deezer.humosoft.uz/chart"

const elThemeToggler = document.querySelector("[data-theme-toggler]")
const elBody = document.body

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
  onToggleBtnClick(evt)
  onSearchBtnClick(evt)
})

// play toggle function 
function onToggleBtnClick(evt) {
  const elTarget = evt.target.closest("[data-toggle-btn]")

  if (!elTarget) return

  document.querySelectorAll("[data-toggle-btn].playing").forEach(btn => {
    if (elTarget.dataset.trackURL !== btn.dataset.trackURL) {
      btn.classList.remove("playing")
    }
  })

  elTarget.classList.toggle("playing")

  if (elAudio.src !== elTarget.dataset.trackURL) {
    elAudio.src = elTarget.dataset.trackURL
  }

  if (elAudio.paused) elAudio.play()
  else elAudio.pause()
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
