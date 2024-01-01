import React from "react";
import headphones from "../images/headphones.jpg";
const Home = () => {
  return (
    <div className="text-beige">
      <div className=" flex flex-col items-center justify-center h-96">
        <div>bring all of your musical tastes together in one spot</div>
        <div className="text-8xl">music hub</div>
        <button
          onClick={() => {
            window.location.href = "http://localhost:4000/auth/login";
          }}
          className="border border-white px-3 py-1 mt-4 rounded-xl hover:bg-pink cursor-pointer"
        >
          get started
        </button>
      </div>
      <img
        src={headphones}
        alt="headphones img"
        className="max-w-xs block mx-auto"
      />
    </div>
  );
};

export default Home;
