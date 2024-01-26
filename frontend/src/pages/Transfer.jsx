import React, { useEffect, useState } from "react";

import EmptyList from "../components/EmptyList";
import AddPlaylistPopup from "../components/AddPlaylistPopup";
import { useNavigate } from "react-router-dom";

const Transfer = ({
  setSpotifyPlaylistTracks,
  setSpotifyPlaylistTitle,
  spotifyPlaylistTracks,
}) => {
  const [showPopup, setShowPopup] = useState(false);

  // navigate once the Spotiy playlist is updated

  useEffect(() => {
    if (spotifyPlaylistTracks) {
      navigate("/playlist");
    }
  }, spotifyPlaylistTracks);

  const navigate = useNavigate();

  function handleSpotifyTrackState(playlist) {
    setSpotifyPlaylistTracks(playlist);
  }

  function handleSpotifyTitleState(title) {
    setSpotifyPlaylistTitle(title);
  }

  return (
    <div className="text-white">
      <div className="absolute top-5 left-5 text-5xl">music hub</div>
      <div className="flex flex-col items-center gap-3 py-5 bg-slate-500"></div>
      {showPopup && (
        <div className="flex justify-center">
          <AddPlaylistPopup
            updateSpotifyTracks={handleSpotifyTrackState}
            handlePopup={setShowPopup}
            updateSpotifyTitle={handleSpotifyTitleState}
          />
        </div>
      )}
      <div className="my-20 flex flex-col space-y-4">
        <button
          className="bg-slate-800 p-1 rounded hover:bg-pink mx-3"
          onClick={() => setShowPopup(true)}
        >
          Add Playlist
        </button>
        <EmptyList className="block mx-0 my-auto" />
      </div>
    </div>
  );
};

export default Transfer;
