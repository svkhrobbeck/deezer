const API = "https://deezer.humosoft.uz/chart"

const elTrackTemplate = document.querySelector("[data-track-template]")
const elTracksWrapper = document.querySelector("[data-tracks-wrapper]")

const elAudio = document.querySelector("[data-music]")

// elPauseBtn.addEventListener("click", () => {
//   elAudio.pause()
//   elPlayBtn.style.display = "flex"
//   elPauseBtn.style.display = "none"
// })

// elAudio.addEventListener("ended", () => {
//   elPlayBtn.style.display = "flex"
//   elPauseBtn.style.display = "none"
// })

// GetData function
async function getData(resource) {
  const res = await fetch(resource)
  const searchResult = await res.json()
  renderTracks(searchResult.tracks.data)
}
getData(API)


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

function onPlayBtnClick(evt) {
  const elTarget = evt.target.closest("[data-play-btn]")

  if (!elTarget) return

  
  if (elAudio.paused) {
    elAudio.src = elTarget.dataset.trackURL
    elAudio.play()
  } else {
    elAudio.pause()
  }
}