import React from "react";

// creates empty playlist in Spotify and adds songs to it
const CreateSpotifyPlaylistButton = ({ tracks, title }) => {
  const handleCreatePlaylist = () => {
    fetch("http://localhost:4000/spotify/spotify-playlist?title=" + title, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ spotifyObject: tracks }),
    });
  };
  return (
    <button
      onClick={handleCreatePlaylist}
      className="mt-3 border py-2 px-4 rounded-3xl hover:bg-pink"
    >
      Convert
    </button>
  );
};

export default CreateSpotifyPlaylistButton;
