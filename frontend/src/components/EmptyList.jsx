import React from "react";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
const EmptyList = () => {
  return (
    <div className="flex flex-col items-center gap-3 py-5 bg-slate-500">
      <div className="text-pink text-3xl text-center mt-4">
        enter a playlist to convert to spotify
      </div>

      <div className="border rounded-lg border-white w-1/3 h-1/ flex items-center flex-col p-3 bg-slate-800">
        <SentimentDissatisfiedIcon className="" />
        <div className="border border-white w-full my-1"></div>
        <div>It's a little empty here</div>
        <div className="text-xs">
          Enter in an Apple playlist to start transferring your music to a
          Spotify account!
        </div>
      </div>
    </div>
  );
};

export default EmptyList;
