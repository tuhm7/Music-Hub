import React from "react";
import Instructions from "../components/Instructions";
import CreateSpotifyPlaylistButton from "../components/CreateSpotifyPlaylistButton";
import SongCard from "../components/SongCard";

const Playlist = ({
  spotifyPlaylistTracks,
  setSpotifyPlaylistTracks,
  spotifyPlaylistTitle,
}) => {
  return (
    <div className="flex items-center justify-center flex-col text-white">
      <div className="absolute top-5 left-5 text-5xl">music hub</div>
      <div className="flex flex-col items-center gap-3 py-5 bg-slate-500 w-full"></div>
      <Instructions />
      {spotifyPlaylistTitle && (
        <div className="text-3xl text-pink">
          {spotifyPlaylistTitle["title"]}
        </div>
      )}
      <ul className="border h-96 overflow-auto w-fit px-4 rounded-xl">
        {spotifyPlaylistTracks &&
          spotifyPlaylistTracks.map((songData, i) => (
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
      {spotifyPlaylistTitle && (
        <CreateSpotifyPlaylistButton
          tracks={spotifyPlaylistTracks}
          title={spotifyPlaylistTitle["title"]}
        />
      )}
    </div>
  );
};

export default Playlist;
