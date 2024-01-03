import React from "react";

const SongCard = (props) => {
  return (
    <div className="text-white border my-3 border-white w-60 py-4 rounded-3xl flex space-x-4 items-center hover:border-beige cursor-pointer">
      <img src={props.albumURL} className="pl-3 w-20" />
      <div>
        <p className="font-bold">{props.title}</p>
        <p>{props.artist}</p>
      </div>
    </div>
  );
};

export default SongCard;
