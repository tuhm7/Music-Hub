import React from "react";
import spongebob from "../images/spongebob.gif";
import { useNavigate } from "react-router-dom";
const Confirmation = ({ setSpotifyPlaylistTracks }) => {
  const navigator = useNavigate();
  const handleOnClick = () => {
    setSpotifyPlaylistTracks("");
    navigator("/transfer");
  };
  return (
    <div className="text-white flex flex-col justify-center items-center text-xl">
      <div className="absolute top-5 left-5 text-5xl">music hub</div>
      <div className="flex flex-col items-center gap-3 py-5 bg-slate-500 w-full"></div>
      <div className="flex flex-col items-center space-x-3 mt-8 ">
        <div className="w-full">Your playlist has been converted</div>
        <div>Check your Spotify account</div>
      </div>
      <img src={spongebob} alt="spongebob" className="w-1/3 mt-5" />
      <button
        className="mt-4 border py-2 px-4 rounded-3xl text-sm hover:bg-pink"
        onClick={handleOnClick}
      >
        Convert Another Playlist
      </button>
    </div>
  );
};

export default Confirmation;
