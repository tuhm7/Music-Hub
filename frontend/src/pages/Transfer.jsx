import React, { useState } from "react";
import SongCard from "../components/SongCard";
import EmptyList from "../components/EmptyList";
import AddPlaylistPopup from "../components/AddPlaylistPopup";

const Transfer = () => {
  const [spotifyPlaylist, setSpotifyPlaylist] = useState(null);
  function handleSpotifyState(playlist) {
    setSpotifyPlaylist(playlist);
  }

  return (
    <div className="text-white">
      <div className="absolute top-5 left-5 text-5xl">music hub</div>
      <div className="flex flex-col items-center gap-3 py-5 bg-slate-500"></div>
      {/* <div className="absolute"> */}
      <div className="flex justify-center">
        <AddPlaylistPopup updateSpotify={handleSpotifyState} />
      </div>
      {/* </div> */}
      <div className="my-20 flex flex-col space-y-4">
        {spotifyPlaylist ? (
          <ul className="text-white">
            {spotifyPlaylist.map((songData, i) => (
              <li className="text-white" key={songData.id}>
                <SongCard {...songData} />
              </li>
            ))}
          </ul>
        ) : (
          <>
            <button className="bg-slate-800 p-1 rounded hover:bg-pink mx-3">
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
