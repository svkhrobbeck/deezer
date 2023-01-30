const API = "https://api.deezer.com/chart"
const elAudio = document.querySelector("[data-music]")
const elPlayBtn = document.querySelector("[data-play-btn]")
const elPauseBtn = document.querySelector("[data-pause-btn]")

elPlayBtn.addEventListener("click", () => {
  elAudio.play()
  elPlayBtn.style.display = "none"
  elPauseBtn.style.display = "flex"
})

elPauseBtn.addEventListener("click", () => {
  elAudio.pause()
  elPlayBtn.style.display = "flex"
  elPauseBtn.style.display = "none"
})

elAudio.addEventListener("ended", () => {
  elPlayBtn.style.display = "flex"
  elPauseBtn.style.display = "none"
})

async function getData(resource) {
  const res = await fetch(resource)
  const searchResult = await res.json()
}
getData(API)