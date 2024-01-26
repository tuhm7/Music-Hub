import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const UserProfile = ({ username, setUsername }) => {
  const navigator = useNavigate();
  const [profilePicture, setProfilePicture] = useState("");
  const [showLogOut, setShowLogOut] = useState(false);

  const handleClick = () => {
    setShowLogOut(!showLogOut);
  };

  const handleLogout = () => {
    fetch("http://localhost:4000/auth/logout", {
      mode: "cors",
      credentials: "include",
    });
    setUsername("");
    setProfilePicture("");
    setShowLogOut(false);
    navigator("/");
  };

  useEffect(() => {
    fetch("http://localhost:4000/auth/profile", {
      mode: "cors",
      credentials: "include",
    })
      .then((res) => {
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
    <div className="absolute right-0 mr-3 mt-2 ">
      {username && (
        <div
          className="border flex px-3 py-1 items-center space-x-2 text-white rounded-lg cursor-pointer"
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
      {showLogOut && (
        <div
          className="text-white mt-2 w-fit py-1 absolute right-0 border rounded-lg cursor-pointer text-right px-2"
          onClick={handleLogout}
        >
          Logout {"  "}
          <LogoutIcon />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
