import React from "react";
import { useState, useEffect } from "react";
import example1 from "../images/appleExample1.png";
import example2 from "../images/appleExample2.png";
import { CirclesWithBar } from "react-loader-spinner";
import { backendHost } from "../../constants";

const AddPlaylistPopup = ({
  updateSpotifyTracks,
  handlePopup,
  updateSpotifyTitle,
}) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [url, setUrl] = useState("");
  // playlist contains just tracks list from Apple Music
  const [playlist, setPlaylist] = useState(null);

  /* gets an object with each element containing song title, artist name,
  Spotify uri, and album url once the Apple playlist is scraped */
  useEffect(() => {
    if (playlist) {
      handlePopup(false);
      getSpotifyObject();
    }
  }, playlist);

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const sendUrl = async (e) => {
    getPlaylist();
    setShowSpinner(true);
  };

  // gets playlist data from Apple Music from the backend
  const getPlaylist = () => {
    fetch(
      backendHost +
        "/transfer/apple?" +
        new URLSearchParams({
          appleurl: url,
        }),
      { mode: "cors", credentials: "include" }
    )
      .then((res) => res.json())
      .then((data) => {
        updateSpotifyTitle(data["playlist"][0]);
        setPlaylist(data["playlist"][1]);
      });
  };

  /* method for getting Spotify object where each element containing song title, artist name,
  Spotify uri, and album url */
  const getSpotifyObject = () => {
    fetch(backendHost + "/spotify/songs", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playlist),
    })
      .then((res) => res.json())
      .then((data) => {
        updateSpotifyTracks(data);
      });
  };

  return (
    <div className="flex justify-center py-4 border w-3/4 bg-slate-600 absolute rounded">
      {showSpinner ? (
        <div className="space-y-1">
          <div>Converting</div>
          <CirclesWithBar
            height="100"
            width="100"
            color="pink"
            outerCircleColor="pink"
            innerCircleColor="pink"
            barColor="pink"
            ariaLabel="circles-with-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col space-y-3">
          <div className="px-3">
            Enter an Apple playlist to convert to a Spotify playlist. Follow the
            steps below to get the link for an Apple playlist.
          </div>
          <div className="space-x-3">
            <input
              className="border border-black text-black"
              type="text"
              onChange={handleChange}
            />
            <button
              onClick={sendUrl}
              className="bg-slate-800 p-1 rounded hover:bg-pink"
            >
              Convert Playlist
            </button>
          </div>
          <img src={example1} className="w-1/2" />
          <img src={example2} className="w-1/2" />
        </div>
      )}
    </div>
  );
};

export default AddPlaylistPopup;
