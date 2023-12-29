import React from "react";

const LogInButton = () => {
  var state = randomstring.generate(16);
  var scope = "user-read-private user-read-email";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: process.env.REDIRECT_URI,
        state: state,
      })
  );
  return <div>LogInButton</div>;
};

export default LogInButton;
