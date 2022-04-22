/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import AppButton from '../AppButton';
import React from 'react';
import {motion} from 'framer-motion';
import {TrackCardProps} from 'types';
import {useAppSelector, useAppDispatch} from 'hooks';
import {setPlaylistTracks, setCurrentPlayingSong} from 'store/spotifySlicer';
import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faPause, faMusic} from '@fortawesome/free-solid-svg-icons';
import {millisToMinutesAndSeconds} from 'utils';

/**
 * AppTrackCard component
 * @param  {object} props
 * @return {JSX.Element}
 */
function TrackCard({song}: TrackCardProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const itemVariant = {
    hidden: {opacity: 0, transition: {duration: 0.2}},
    show: {opacity: 1, transition: {duration: 0.2}},
  };
  const playlistTracks = useAppSelector(
    (state) => state.spotify.playlistTracks,
  );
  const currentPlayingSong = useAppSelector(
    (state) => state.spotify.currentPlayingSong,
  );
  const dispatch = useAppDispatch();

  const isSongInPlaylist = (song: TrackCardProps['song']): boolean => {
    return playlistTracks.some((track) => track.id === song.id);
  };

  return (
    <motion.div
      className={
        `flex flex-row items-center border border-[#ffffff50] ` +
        `rounded-lg p-2 hover:bg-zinc-700 `
      }
      variants={itemVariant}
      data-testid="track-card"
    >
      <div
        className="basis-20 md:basis-32 shrink-0 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          className="w-full h-full"
          src={song.album.images[0].url}
          alt={song.album.name}
          title={song.album.name}
        />
        <div
          className={
            `absolute top-0 left-0 bottom-0 right-0 flex flex-col ` +
            `items-center justify-center bg-slate-900/70 ${
              !isHovered && 'hidden'
            }`
          }
          onClick={() => {
            if (currentPlayingSong === song.preview_url) {
              dispatch(setCurrentPlayingSong(null));
            } else {
              dispatch(setCurrentPlayingSong(song.preview_url));
            }
          }}
        >
          {currentPlayingSong !== song.preview_url ? (
            <FontAwesomeIcon
              icon={faPlay}
              className="text-white"
            ></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon
              icon={faPause}
              className="text-white"
            ></FontAwesomeIcon>
          )}
        </div>
      </div>
      <div className="flex-grow pl-4">
        <h3 className="text-md font-bold text-white">
          <FontAwesomeIcon icon={faMusic} className="mr-2"></FontAwesomeIcon>
          {song.name}
        </h3>
        <h4 className="text-xs font-normal text-zinc-300 w-fit">
          Artist :{' '}
          {song.artists.map((artist, index) => {
            return (
              <React.Fragment key={index}>
                {artist.name}
                {index !== song.artists.length - 1 && ', '}
              </React.Fragment>
            );
          })}
        </h4>
        <h4 className="text-xs font-normal text-zinc-300 w-fit">
          Album : {song.album.name}
        </h4>
        <h4 className="text-xs font-normal text-zinc-300 w-fit">
          Duration : {millisToMinutesAndSeconds(song.duration_ms)}
        </h4>
        {isSongInPlaylist(song) ? (
          <AppButton
            buttonTheme="danger"
            buttonText="Remove"
            buttonSize="small"
            buttonClick={() => {
              dispatch(
                setPlaylistTracks(
                  playlistTracks.filter(
                    (eachTrack) => eachTrack.id !== song.id,
                  )!,
                ),
              );
            }}
            buttonClass="rounded-lg mt-2"
          ></AppButton>
        ) : (
          <AppButton
            buttonTheme="primary"
            buttonText="Add"
            buttonSize="small"
            buttonClick={() => {
              dispatch(setPlaylistTracks([...playlistTracks, song]!));
            }}
            buttonClass="rounded-lg mt-2"
          ></AppButton>
        )}
      </div>
    </motion.div>
  );
}

export default TrackCard;
