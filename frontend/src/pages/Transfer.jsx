import React, { useEffect, useState } from "react";
import SongCard from "../components/SongCard";
import EmptyList from "../components/EmptyList";
import AddPlaylistPopup from "../components/AddPlaylistPopup";
import Instructions from "../components/Instructions";
import CreateSpotifyPlaylistButton from "../components/CreateSpotifyPlaylistButton";

const Transfer = () => {
  const [spotifyPlaylistTracks, setSpotifyPlaylistTracks] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [spotifyPlaylistTitle, setSpotifyPlaylistTitle] = useState(null);

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
        {spotifyPlaylistTracks ? (
          <div className="flex items-center justify-center flex-col space-x-5">
            <Instructions />
            {spotifyPlaylistTitle && (
              <div className="text-3xl text-pink">
                {spotifyPlaylistTitle["title"]}
              </div>
            )}
            <ul className="text-white border h-96 overflow-auto w-fit px-4 rounded-xl">
              {spotifyPlaylistTracks.map((songData, i) => (
                <li
                  className="text-white"
                  key={i}
                  onClick={() => {
                    setSpotifyPlaylistTracks(
                      spotifyPlaylistTracks.filter((item) => item !== songData)
                    );
                  }}
                >
                  <SongCard {...songData} />
                </li>
              ))}
            </ul>
            <CreateSpotifyPlaylistButton
              tracks={spotifyPlaylistTracks}
              title={spotifyPlaylistTitle["title"]}
            />
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
