import React from "react";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
const EmptyList = () => {
  return (
    <div className="flex justify-center text-white">
      <div className="border rounded-lg border-white w-1/3 min-w-64 flex items-center flex-col p-3 bg-slate-800 h-1/6 min-h-32">
        <SentimentDissatisfiedIcon className="" />
        <div className="border border-white w-full my-1"></div>
        <p className="pt-1">It's a little empty here</p>
        <p className="text-xs">
          Enter in an Apple playlist to start transferring your music to a
          Spotify account!
        </p>
      </div>
    </div>
  );
};

export default EmptyList;
