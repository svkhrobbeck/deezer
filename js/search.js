const API_SEARCH = "https://deezer.humosoft.uz/search?q="
const searchQuery = new URLSearchParams(window.location.search).get("query")

const elSearchPageWrapper = document.querySelector("[data-search-page-wrapper]")
const elSearchPageTrackWrapper = document.querySelector("[data-search-page-track-wrapper]")

// get Data
async function getArtistData(resource, query) {

  loader(true)

  const res = await fetch(`${resource}${query}`)
  const searchResult = await res.json()

  loader(false)

  renderSearchedTracks(searchResult.data)

}

getArtistData(API_SEARCH, searchQuery)

document.title = `${(searchQuery).charAt().toUpperCase() + (searchQuery).slice(1)}`

// Render tracks function
function renderSearchedTracks(tracks) {

  tracks.forEach(track => {
    const elSearchTrackCard = elTrackTemplate.content.cloneNode(true)
    const elSearchTrackCardImg = elSearchTrackCard.querySelector("[data-track-img]")

    document.querySelector("[data-search-page-tracks-title]").textContent = `Tracks of ${(searchQuery).charAt().toUpperCase() + (searchQuery).slice(1)}`
    elSearchTrackCardImg.src = track.album.cover_big
    elSearchTrackCardImg.width = 250
    elSearchTrackCardImg.height = 250
    elSearchTrackCard.querySelector("[data-track-title]").textContent = track.title
    elSearchTrackCard.querySelector("[data-track-album-text]").textContent = `Album: ${track.album.title}`
    elSearchTrackCard.querySelector("[data-track-name-text]").textContent = `Author: ${track.artist.name}`
    elSearchTrackCard.querySelector("[data-play-btn]").dataset.trackURL = track.preview

    elSearchPageTrackWrapper.appendChild(elSearchTrackCard)
  })
}