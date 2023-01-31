const API_ARTIST = "https://deezer.humosoft.uz/artist"
const artistId = new URLSearchParams(window.location.search).get("id")

const elArtistPageWrapper = document.querySelector("[data-artists-page-wrapper]")
const elArtistPageTrackWrapper = document.querySelector("[data-artists-page-track-wrapper]")

async function getArtistData(resource, id) {
  const res = await fetch(`${resource}/${id}`)
  const searchResult = await res.json()

  const resTracks = await fetch(`${resource}/${id}/top?limit=50`)
  const searchTracksResult = await resTracks.json()
  renderArtistInfo(searchResult)

  renderTracksTop(searchTracksResult.data)
}

getArtistData(API_ARTIST, artistId)


function renderArtistInfo(artist) {
  const elArtistPageCard = elArtistTemplate.content.cloneNode(true)
  const elArtistPageCardImg = elArtistPageCard.querySelector("[data-artist-img]")

  elArtistPageCardImg.src = artist.picture_big
  elArtistPageCardImg.alt = artist.name
  elArtistPageCardImg.width = 250
  elArtistPageCardImg.height = 250
  elArtistPageCard.querySelector("[data-artist-name]").textContent = artist.name
  elArtistPageCard.querySelector("[data-artist-job-text]").textContent = artist.type

  elArtistPageWrapper.appendChild(elArtistPageCard)
}

// Render tracks function
function renderTracksTop(tracks) {

  tracks.forEach(track => {
    const elArtistTrackCard = elTrackTemplate.content.cloneNode(true)
    const elArtistTrackCardImg = elArtistTrackCard.querySelector("[data-track-img]")

    elArtistTrackCardImg.src = track.album.cover_big
    elArtistTrackCardImg.width = 250
    elArtistTrackCardImg.height = 250
    elArtistTrackCard.querySelector("[data-track-title]").textContent = track.title
    elArtistTrackCard.querySelector("[data-track-album-text]").textContent = `Album: ${track.album.title}`
    elArtistTrackCard.querySelector("[data-track-name-text]").textContent = `Author: ${track.artist.name}`
    elArtistTrackCard.querySelector("[data-play-btn]").dataset.trackURL = track.preview

    elArtistPageTrackWrapper.appendChild(elArtistTrackCard)
  })
}