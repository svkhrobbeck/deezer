
// GetData function
async function getData(resource) {
  const res = await fetch(resource)
  const searchResult = await res.json()
  renderArtists(searchResult.artists.data)
  renderPlaylists(searchResult.playlists.data)
  renderTracks(searchResult.tracks.data)
  renderPodcasts(searchResult.podcasts.data)
}
getData(API)

// Render Artists function
function renderArtists(artists) {
  elArtistsWrapper.innerHTML = ""

  artists.forEach(artist => {
    const elArtistCard = elArtistTemplate.content.cloneNode(true)
    const elArtistCardImg = elArtistCard.querySelector("[data-artist-img]")

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

    elPlaylistCardImg.src = playlist.picture_big
    elPlaylistCardImg.width = 250
    elPlaylistCardImg.height = 250
    elPlaylistCard.querySelector("[data-playlist-title]").textContent = playlist.title
    elPlaylistCard.querySelector("[data-playlist-type-text]").textContent = playlist.type
    elPlaylistCard.querySelector("[data-playlist-link]").href = `playlist.html?id=${playlist.id}`

    elPlaylistsWrapper.appendChild(elPlaylistCard)
  })
}

// Render tracks function
function renderTracks(tracks) {
  elTracksWrapper.innerHTML = ""

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

// Render podcasts function
function renderPodcasts(podcasts) {
  elTPodcastsWrapper.innerHTML = ""

  podcasts.forEach(podcast => {
    const elPodcastCard = elPodcastTemplate.content.cloneNode(true)
    const elPodcastCardImg = elPodcastCard.querySelector("[data-podcast-img]")

    elPodcastCardImg.src = podcast.picture_big
    elPodcastCardImg.width = 300
    elPodcastCardImg.height = 300
    elPodcastCard.querySelector("[data-podcast-title]").textContent = podcast.title
    elPodcastCard.querySelector("[data-podcast-desc-text]").textContent = podcast.description

    elTPodcastsWrapper.appendChild(elPodcastCard)
  })
}


// Swiper
const swiper = new Swiper('.swiper', {

  direction: "horizontal",
  speed: 400,
  slidesPerView: 2,
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

  // breakpoints
  breakpoints: {
    400: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
  },

  breakpoints: {
    760: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },

  breakpoints: {
    1240: {
      slidesPerView: 5,
      spaceBetween: 25,
    },
  }
});