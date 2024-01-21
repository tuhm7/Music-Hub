import React, { useState } from "react";
import SongCard from "../components/SongCard";
import EmptyList from "../components/EmptyList";
import AddPlaylistPopup from "../components/AddPlaylistPopup";
import Instructions from "../components/Instructions";
import CreatePlaylistButton from "../components/CreatePlaylistButton";

const Transfer = () => {
  const [spotifyPlaylist, setSpotifyPlaylist] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  function handleSpotifyState(playlist) {
    setSpotifyPlaylist(playlist);
  }

  return (
    <div className="text-white">
      <div className="absolute top-5 left-5 text-5xl">music hub</div>
      <div className="flex flex-col items-center gap-3 py-5 bg-slate-500"></div>
      {showPopup && (
        <div className="flex justify-center">
          <AddPlaylistPopup
            updateSpotify={handleSpotifyState}
            handlePopup={setShowPopup}
          />
        </div>
      )}
      <div className="my-20 flex flex-col space-y-4">
        {spotifyPlaylist ? (
          <div className="flex items-center justify-center flex-col space-x-5">
            <Instructions />
            <ul className="text-white border h-96 overflow-auto w-fit px-4 rounded-xl">
              {spotifyPlaylist.map((songData, i) => (
                <li
                  className="text-white"
                  key={i}
                  onClick={() => {
                    setSpotifyPlaylist(
                      spotifyPlaylist.filter((item) => item !== songData)
                    );
                  }}
                >
                  <SongCard {...songData} />
                </li>
              ))}
            </ul>
            <CreatePlaylistButton playlist={spotifyPlaylist} />
          </div>
        ) : (
          <>
            <button
              className="bg-slate-800 p-1 rounded hover:bg-pink mx-3"
              onClick={() => setShowPopup(true)}
            >
              Add Playlist
            </button>
            <EmptyList className="block mx-0 my-auto" />
          </>
        )}
      </div>
    </div>
  );
};

export default Transfer;
