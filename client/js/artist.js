const artistId = new URLSearchParams(window.location.search).get("id");

const elArtistPageWrapper = document.querySelector("[data-artists-page-wrapper]");
const elArtistPageTrackWrapper = document.querySelector("[data-artists-page-track-wrapper]");

// get Data
async function getArtistData(url, id) {
  loader(true);

  const res = await fetch(`${url}/${id}`);
  const searchResult = await res.json();

  const resTracks = await fetch(`${url}/${id}/top?limit=50`);
  const searchTracksResult = await resTracks.json();

  loader(false);
  renderArtistInfo(searchResult);
  renderTracksTop(searchTracksResult.data);
}

getArtistData(API.artist, artistId);

// Render artist info
function renderArtistInfo(artist) {
  const elArtistPageCard = elArtistTemplate.content.cloneNode(true);
  const elArtistPageCardImg = elArtistPageCard.querySelector("[data-artist-img]");

  document.title = `${artist.name}`;
  document.querySelector("[data-artist-page-title]").textContent = "Artist";
  elArtistPageCardImg.src = artist.picture_big;
  elArtistPageCardImg.alt = artist.name;
  elArtistPageCardImg.width = 250;
  elArtistPageCardImg.height = 250;
  elArtistPageCard.querySelector("[data-artist-name]").textContent = artist.name;
  elArtistPageCard.querySelector("[data-artist-job-text]").textContent = artist.type;

  elArtistPageWrapper.appendChild(elArtistPageCard);
}

// Render tracks function
function renderTracksTop(tracks) {
  tracks.forEach(track => {
    const elArtistTrackCard = elTrackTemplate.content.cloneNode(true);
    const elArtistTrackCardImg = elArtistTrackCard.querySelector("[data-track-img]");

    document.querySelector("[data-artist-page-tracks-title]").textContent = "Tracks";
    elArtistTrackCardImg.src = track.album.cover_big;
    elArtistTrackCardImg.width = 250;
    elArtistTrackCardImg.height = 250;
    elArtistTrackCard.querySelector("[data-track-title]").textContent = track.title;
    elArtistTrackCard.querySelector("[data-track-album-text]").textContent = `Album: ${track.album.title}`;
    elArtistTrackCard.querySelector("[data-track-name-text]").textContent = `Author: ${track.artist.name}`;
    elArtistTrackCard.querySelector("[data-toggle-btn]").dataset.trackURL = track.preview;

    elArtistPageTrackWrapper.appendChild(elArtistTrackCard);
  });
}
