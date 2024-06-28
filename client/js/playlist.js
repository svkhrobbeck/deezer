const playlistId = new URLSearchParams(window.location.search).get("id");

const elPlaylistPageWrapper = document.querySelector("[data-playlist-page-wrapper]");
const elPlaylistPageTrackWrapper = document.querySelector("[data-playlist-page-track-wrapper]");

// Get data
async function getPlaylistData(resource, id) {
  loader(true);

  const res = await fetch(`${resource}/${id}`);
  const searchResult = await res.json();

  const resTracks = await fetch(`${resource}/${id}/tracks`);
  const searchTracksResult = await resTracks.json();

  console.log(searchTracksResult);

  loader(false);

  renderPlaylistInfo(searchResult);
  renderTracksPlaylist(searchTracksResult.data);
}

getPlaylistData(API_PLAYLIST, playlistId);

// Render playlist info
function renderPlaylistInfo(playlist) {
  if (!playlist.error) {
    const elPlaylistPageCard = elPlaylistTemplate.content.cloneNode(true);
    const elPlaylistPageCardImg = elPlaylistPageCard.querySelector("[data-playlist-img]");

    document.title = `${playlist.title}`;
    document.querySelector("[data-playlist-page-title]").textContent = "Playlist";
    elPlaylistPageCardImg.src = playlist.picture_big;
    elPlaylistPageCardImg.alt = playlist.title;
    elPlaylistPageCardImg.width = 250;
    elPlaylistPageCardImg.height = 250;
    elPlaylistPageCard.querySelector("[data-playlist-title]").textContent = playlist.title;
    elPlaylistPageCard.querySelector("[data-playlist-desc-text]").textContent = playlist.description;

    elPlaylistPageWrapper.appendChild(elPlaylistPageCard);
  } else {
    elPlaylistPageWrapper.innerHTML = `<h2 class="info-card__card-title">${playlist.error.message}!</h2>`;
  }
}

// Render tracks function
function renderTracksPlaylist(tracks) {
  tracks.forEach(track => {
    const elPlaylistTrackCard = elTrackTemplate.content.cloneNode(true);
    const elPlaylistTrackCardImg = elPlaylistTrackCard.querySelector("[data-track-img]");

    document.querySelector("[data-playlist-page-tracks-title]").textContent = "Tracks";
    elPlaylistTrackCardImg.src = track.album.cover_big;
    elPlaylistTrackCardImg.width = 250;
    elPlaylistTrackCardImg.height = 250;
    elPlaylistTrackCard.querySelector("[data-track-title]").textContent = track.title;
    elPlaylistTrackCard.querySelector("[data-track-album-text]").textContent = `Album: ${track.album.title}`;
    elPlaylistTrackCard.querySelector("[data-track-name-text]").textContent = `Author: ${track.artist.name}`;
    elPlaylistTrackCard.querySelector("[data-toggle-btn]").dataset.trackURL = track.preview;

    elPlaylistPageTrackWrapper.appendChild(elPlaylistTrackCard);
  });
}
