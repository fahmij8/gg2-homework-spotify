import React from 'react';
import AppTrackCard from './AppTrackCard';
import {motion} from 'framer-motion';

/**
 * Tracks component
 * @param  {object} playlist
 * @param  {void} setPlaylist
 * @param  {object} songData
 * @return {JSX.Element}
 */
function Track({playlist, setPlaylist, songData}) {
  const trackListVariants = {
    hidden: {opacity: 0},
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <div className="flex flex-col mx-6 sm:mx-11 md:mx-20">
      {typeof songData === 'string' && (
        <h2 className="text-md text-center font-bold text-white">{songData}</h2>
      )}
      {typeof songData === 'object' && songData.length > 0 && (
        <motion.div
          initial="hidden"
          animate="show"
          variants={trackListVariants}
          className="grid lg:grid-cols-3 md:grid-cols-2 gap-x-3
      gap-y-5 xl:gap-x-6"
        >
          {songData.map((song) => {
            return (
              <AppTrackCard
                key={song.id}
                song={song}
                playlist={playlist}
                setPlaylist={setPlaylist}
              ></AppTrackCard>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}

export default Track;
