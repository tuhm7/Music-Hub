import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Transfer = () => {
  const [url, setUrl] = useState("");
  const [playlist, setPlaylist] = useState(null);
  var id = "";

  // useEffect(() => {
  //   id = Cookies.get("session_id");
  //   console.log(id);
  // });

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

  const getToken = () => {
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
      .then((data) => console.log(data));
  };

  useEffect(() => {
    if (playlist) {
      getToken();
    }
  }, playlist);

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
