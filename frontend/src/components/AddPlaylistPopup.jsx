import React from "react";
import { useState, useEffect } from "react";
import example1 from "../images/appleExample1.png";
import example2 from "../images/appleExample2.png";
const AddPlaylistPopup = ({ updateSpotify, handlePopup }) => {
  const [url, setUrl] = useState("");
  const [playlist, setPlaylist] = useState(null);
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
  };

  const getPlaylist = () => {
    fetch(
      "http://localhost:4000/transfer/apple?" +
        new URLSearchParams({
          appleurl: url,
        }),
      { credentials: "include" }
    )
      .then((res) => res.json())
      .then((data) => {
        setPlaylist(data);
      });
  };

  const getSpotifyObject = () => {
    fetch("http://localhost:4000/spotify/songs", {
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
        console.log(data);
        updateSpotify(data);
      });
  };

  return (
    <div className="flex justify-center py-4 border w-3/4 bg-slate-600 absolute rounded">
      <div>
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
      </div>
    </div>
  );
};

export default AddPlaylistPopup;
