import React, { useState, useEffect } from "react";

const Transfer = () => {
  const [url, setUrl] = useState("");
  const [playlist, setPlaylist] = useState(null);
  const handleChange = (e) => {
    setUrl(e.target.value);
    console.log(url);
  };
  // useEffect(() => {
  // console.log(playlist["playlist"]);
  // });
  const sendUrl = (e) => {
    fetch(
      "http://localhost:4000/transfer/apple?" +
        new URLSearchParams({
          appleurl: url,
        })
    )
      .then((res) => res.json())
      .then((data) => {
        setPlaylist(data);
        console.log(playlist);
      });
  };
  useEffect(() => {
    console.log(playlist);
  }, playlist);
  var i = 0;
  return (
    <div>
      <div className="ml-8 mt-8 text-3xl text-pink">
        start transfering your playlists to your spotify account
      </div>
      <div className="space-x-4">
        <input className="ml-8" type="text" onChange={handleChange} />
        <button
          onClick={sendUrl}
          className="bg-beige p-1 text-black rounded hover:bg-pink"
        >
          Convert Playlist
        </button>
        <div>
          {playlist ? (
            <ul className="border border-white text-white">
              {playlist["playlist"].map((song, i) => (
                <li className="text-white" key={song.id}>
                  {song.title}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-white">Enter a playlist</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transfer;
