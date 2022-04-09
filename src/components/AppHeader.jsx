import React from 'react';
import spotifyLogo from 'images/Spotify_Logo.png';
/**
 * AppHeader component
 * @return {JSX.Element}
 */
function AppHeader() {
  return (
    <div className="pt-8">
      <img
        src={spotifyLogo}
        alt="Spotify Logo"
        className="w-[170px] block mx-auto"
      />
      <h1 className="text-xl text-center font-bold text-white mt-2 mb-3">
        Playlist Maker
      </h1>
    </div>
  );
}

export default AppHeader;
