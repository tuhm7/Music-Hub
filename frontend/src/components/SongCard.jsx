import React from "react";

const SongCard = (props) => {
  return (
    <div className="relative flex justify-center items-center my-4 rounded-3xl hover:bg-pink cursor-pointer">
      <div className="relative text-white border border-white w-96 py-2 rounded-3xl flex space-x-4 items-center">
        <img src={props.albumURL} className="pl-4 w-20" />
        <div>
          <p className="font-bold">{props.title}</p>
          <p>{props.artist}</p>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
