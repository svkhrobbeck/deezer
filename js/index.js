const elArtistsWrapper = document.querySelector("[data-artists-wrapper]")
const elPlaylistsWrapper = document.querySelector("[data-playlists-wrapper]")
const elTracksWrapper = document.querySelector("[data-tracks-wrapper]")
const elTPodcastsWrapper = document.querySelector("[data-podcasts-wrapper]")

// GetData function
async function getData(resource) {

  loader(true)

  const res = await fetch(resource)
  const searchResult = await res.json()

  renderArtists(searchResult.artists.data)
  renderPlaylists(searchResult.playlists.data)
  renderTracks(searchResult.tracks.data)
  renderPodcasts(searchResult.podcasts.data)

  loader(false)

}
getData(API)

// Render Artists function
function renderArtists(artists) {
  elArtistsWrapper.innerHTML = ""

  artists.forEach(artist => {
    const elArtistCard = elArtistTemplate.content.cloneNode(true)
    const elArtistCardImg = elArtistCard.querySelector("[data-artist-img]")

    document.querySelector("[data-artists-title]").textContent = "Artists"
    elArtistCardImg.src = artist.picture_big
    elArtistCardImg.width = 250
    elArtistCardImg.height = 250
    elArtistCard.querySelector("[data-artist-name]").textContent = artist.name
    elArtistCard.querySelector("[data-artist-job-text]").textContent = artist.type
    elArtistCard.querySelector("[data-artist-link]").href = `artist.html?id=${artist.id}`

    elArtistsWrapper.appendChild(elArtistCard)
  })
}

// Render Playlists function
function renderPlaylists(playlists) {
  elPlaylistsWrapper.innerHTML = ""

  playlists.forEach(playlist => {
    const elPlaylistCard = elPlaylistTemplate.content.cloneNode(true)
    const elPlaylistCardImg = elPlaylistCard.querySelector("[data-playlist-img]")
    const elPlaylistLink = elPlaylistCard.querySelector("[data-playlist-link]")

    document.querySelector("[data-playlists-title]").textContent = "Playlists"
    elPlaylistCardImg.src = playlist.picture_big
    elPlaylistCardImg.width = 250
    elPlaylistCardImg.height = 250
    elPlaylistCard.querySelector("[data-playlist-title]").textContent = playlist.title
    elPlaylistCard.querySelector("[data-playlist-type-text]").textContent = playlist.type

    if (playlist.public) {
      elPlaylistLink.href = `playlist.html?id=${playlist.id}`
    } else {
      elPlaylistLink.removeAttribute("href")
      elPlaylistLink.style.color = "#777"
    }

    elPlaylistsWrapper.appendChild(elPlaylistCard)
  })
}

// Render tracks function
function renderTracks(tracks) {
  elTracksWrapper.innerHTML = ""

  tracks.forEach(track => {
    const elTrackCard = elTrackTemplate.content.cloneNode(true)
    const elTrackCardImg = elTrackCard.querySelector("[data-track-img]")

    document.querySelector("[data-tracks-title]").textContent = "Tracks"
    elTrackCardImg.src = track.artist.picture_big
    elTrackCardImg.width = 250
    elTrackCardImg.height = 250
    elTrackCard.querySelector("[data-track-title]").textContent = track.title
    elTrackCard.querySelector("[data-track-type-text]").textContent = track.type
    elTrackCard.querySelector("[data-toggle-btn]").dataset.trackURL = track.preview

    elTracksWrapper.appendChild(elTrackCard)
  })
}

// Render podcasts function
function renderPodcasts(podcasts) {
  elTPodcastsWrapper.innerHTML = ""

  podcasts.forEach(podcast => {
    const elPodcastCard = elPodcastTemplate.content.cloneNode(true)
    const elPodcastCardImg = elPodcastCard.querySelector("[data-podcast-img]")
    const elPodcastCardTitle = elPodcastCard.querySelector("[data-podcast-title]")
    const elPodcastCardDesc = elPodcastCard.querySelector("[data-podcast-desc-text]")

    document.querySelector("[data-podcasts-title]").textContent = "Podcasts"
    elPodcastCardImg.src = podcast.picture_big
    elPodcastCardImg.width = 300
    elPodcastCardImg.height = 300
    elPodcastCardTitle.textContent = podcast.title
    elPodcastCardTitle.setAttribute("title", `${podcast.title}`)
    elPodcastCardDesc.textContent = podcast.description
    elPodcastCardDesc.setAttribute("title", `${podcast.description}`)

    elTPodcastsWrapper.appendChild(elPodcastCard)
  })
}

// Swiper slider
const swiper = new Swiper('.swiper', {

  direction: "horizontal",
  speed: 400,
  slidesPerView: 1,
  spaceBetween: 10,
  loop: false,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  scrollbar: {
    el: '.swiper-scrollbar',
  },

  breakpoints: {
    350: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    500: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    750: {
      slidesPerView: 4,
    },
    1000: {
      slidesPerView: 5,
      spaceBetween: 25,
    },
  },
});