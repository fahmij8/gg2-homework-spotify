import React from 'react';
import AppButton from './AppButton';
import {motion} from 'framer-motion';

/**
 * AppTrackCard component
 * @param  {object} song
 * @param  {object} playlist
 * @param  {void} setPlaylist
 * @return {JSX.Element}
 */
function TrackCard({song, playlist, setPlaylist}) {
  const itemVariant = {
    hidden: {opacity: 0},
    show: {opacity: 1},
  };

  return (
    <motion.div
      className="flex flex-row items-center border border-[#ffffff50]
    rounded-lg p-2 hover:bg-zinc-700 "
      variants={itemVariant}
    >
      <div className="basis-20 shrink-0">
        <img
          className="w-full h-full"
          src={song.album.images[0].url}
          alt={song.album.name}
          title={song.album.name}
        />
      </div>
      <div className="flex-grow pl-4">
        <h3 className="text-md font-bold text-white">{song.name}</h3>
        <h4 className="text-sm font-light text-white w-fit">
          <a
            href={song.artists[0].external_urls.spotify}
            target="_blank"
            rel="noreferrer"
            className="hover:underline "
          >
            {song.artists[0].name}
          </a>{' '}
          -{' '}
          <a
            href={song.album.external_urls.spotify}
            target="_blank"
            rel="noreferrer"
            className="hover:underline "
          >
            {song.album.name}
          </a>
        </h4>
        {playlist.includes(song) ? (
          <AppButton
            buttonTheme="danger"
            buttonText="Remove"
            buttonSize="small"
            buttonClick={() => {
              setPlaylist(playlist.filter((eachTrack) => eachTrack !== song));
            }}
            buttonClass="rounded-lg mt-1"
          ></AppButton>
        ) : (
          <AppButton
            buttonTheme="primary"
            buttonText="Add"
            buttonSize="small"
            buttonClick={() => {
              setPlaylist([...playlist, song]);
            }}
            buttonClass="rounded-lg mt-1"
          ></AppButton>
        )}
      </div>
    </motion.div>
  );
}

export default TrackCard;
