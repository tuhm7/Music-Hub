import React from "react";

const CreatePlaylistButton = ({ playlist }) => {
  const handleCreatePlaylist = () => {
    fetch("http://localhost:4000/spotify/spotify-playlist", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ spotifyObject: playlist }),
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

export default CreatePlaylistButton;
