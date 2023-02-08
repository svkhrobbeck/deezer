const API_SEARCH = "https://deezer.humosoft.uz/search?q="
const searchQuery = new URLSearchParams(window.location.search).get("query")

// Search Result data
const searchQueryArr = searchQuery.split(" ")
let searchResult = ""
searchQueryArr.forEach(text => {
  const capitalizeText = (text).charAt().toUpperCase() + (text).slice(1)
  searchResult += `${capitalizeText} `
});

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

document.title = searchResult

// Render tracks function
function renderSearchedTracks(tracks) {

  tracks.forEach(track => {
    const elSearchTrackCard = elTrackTemplate.content.cloneNode(true)
    const elSearchTrackCardImg = elSearchTrackCard.querySelector("[data-track-img]")

    document.querySelector("[data-search-page-tracks-title]").textContent = `${searchResult}`
    elSearchTrackCardImg.src = track.album.cover_big
    elSearchTrackCardImg.width = 250
    elSearchTrackCardImg.height = 250
    elSearchTrackCard.querySelector("[data-track-title]").textContent = track.title
    elSearchTrackCard.querySelector("[data-track-album-text]").textContent = `Album: ${track.album.title}`
    elSearchTrackCard.querySelector("[data-track-name-text]").textContent = `Author: ${track.artist.name}`
    elSearchTrackCard.querySelector("[data-toggle-btn]").dataset.trackURL = track.preview

    elSearchPageTrackWrapper.appendChild(elSearchTrackCard)
  })
}

