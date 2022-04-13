import React from 'react';
import Search from './Search';
import Tracks from './Tracks';
import AppPagination from './AppPagination';

/**
 * CreatePlaylistSearch component
 * @param {string|object} searchResult
 * @param {void} setSearchResult
 * @param {number} searchOffset
 * @param {void} setSearchOffset
 * @param {object} playlistTracks
 * @param {void} setPlaylistTracks
 * @return {JSX.Element}
 */
function CreatePlaylistSearch({
  searchResult,
  setSearchResult,
  searchOffset,
  setSearchOffset,
  playlistTracks,
  setPlaylistTracks,
}) {
  return (
    <div className="my-5">
      <Search
        searchResult={searchResult}
        setSearchResult={setSearchResult}
        searchOffset={searchOffset}
        setSearchOffset={setSearchOffset}
      />
      <Tracks
        playlist={playlistTracks}
        setPlaylist={setPlaylistTracks}
        songData={searchResult}
      ></Tracks>
      <AppPagination
        searchOffset={searchOffset}
        setSearchOffset={setSearchOffset}
        songData={searchResult}
      ></AppPagination>
    </div>
  );
}

export default CreatePlaylistSearch;
