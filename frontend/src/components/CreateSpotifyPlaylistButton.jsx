import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CirclesWithBar } from "react-loader-spinner";
import { backendHost } from "../../constants";

// creates empty playlist in Spotify and adds songs to it
const CreateSpotifyPlaylistButton = ({ tracks, title }) => {
  const navigator = useNavigate();
  const [showSpinner, setShowSpinner] = useState(false);

  const handleCreatePlaylist = () => {
    fetch(backendHost + "/spotify/spotify-playlist?title=" + title, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ spotifyObject: tracks }),
    });
    setShowSpinner(true);
    setTimeout(() => {
      navigator("/confirmation");
    }, 1000);
  };
  return (
    <>
      <button
        onClick={handleCreatePlaylist}
        className="mt-3 mb-3 border py-2 px-4 rounded-3xl hover:bg-pink"
      >
        Convert
      </button>
      {showSpinner && (
        <CirclesWithBar
          height="50"
          width="50"
          color="pink"
          outerCircleColor="pink"
          innerCircleColor="pink"
          barColor="pink"
          ariaLabel="circles-with-bar-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
    </>
  );
};

export default CreateSpotifyPlaylistButton;
