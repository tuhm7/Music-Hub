import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ username, setUsername }) => {
  const navigator = useNavigate();
  const [profilePicture, setProfilePicture] = useState("");
  const [showLogOut, setShowLogOut] = useState(false);

  const handleClick = () => {
    setShowLogOut(!showLogOut);
  };

  useEffect(() => {
    fetch("http://localhost:4000/auth/profile", {
      mode: "cors",
      credentials: "include",
    })
      .then((res) => {
        console.log(res.status);
        if (res.status === 400) {
          navigator("/");
        }
        return res.json();
      })
      .then((data) => {
        setUsername(data.username);
        setProfilePicture(data.profilePicture);
      });
  }, []);
  return (
    <>
      {username && (
        <div
          className="border flex px-3 py-1 items-center space-x-2 text-white absolute right-0 mr-3 mt-2 rounded-lg cursor-pointer"
          onClick={handleClick}
        >
          {profilePicture && (
            <img
              src={profilePicture}
              alt="profilePicture"
              className="rounded-3xl w-8"
            />
          )}
          <div>{username}</div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
