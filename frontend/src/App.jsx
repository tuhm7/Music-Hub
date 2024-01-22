import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Transfer from "./pages/Transfer";
import Playlist from "./pages/Playlist";
import Confirmation from "./pages/Confirmation";

function App() {
  const [spotifyPlaylistTracks, setSpotifyPlaylistTracks] = useState(null);
  const [spotifyPlaylistTitle, setSpotifyPlaylistTitle] = useState(null);

  return (
    <div className="font-primary">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/transfer"
          element={
            <Transfer
              setSpotifyPlaylistTracks={setSpotifyPlaylistTracks}
              setSpotifyPlaylistTitle={setSpotifyPlaylistTitle}
              spotifyPlaylistTracks={spotifyPlaylistTracks}
            />
          }
        />
        <Route
          path="/playlist"
          element={
            <Playlist
              spotifyPlaylistTracks={spotifyPlaylistTracks}
              setSpotifyPlaylistTracks={setSpotifyPlaylistTracks}
              spotifyPlaylistTitle={spotifyPlaylistTitle}
            />
          }
        />
        <Route
          path="/confirmation"
          element={
            <Confirmation setSpotifyPlaylistTracks={setSpotifyPlaylistTracks} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
