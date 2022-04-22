import AppTrackCard from '../AppTrackCard';
import {motion} from 'framer-motion';
import {useAppSelector} from 'hooks';
import {useEffect, useRef} from 'react';

/**
 * Tracks component
 * @return {JSX.Element}
 */
function Track({
  songData,
}: {
  songData: SpotifyApi.TrackObjectFull[] | [] | string;
}): JSX.Element {
  const audioPlayer = useRef(new Audio());
  const currentPlayingSong = useAppSelector(
    (state) => state.spotify.currentPlayingSong,
  );
  const trackListVariants = {
    hidden: {opacity: 0},
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.09,
      },
    },
  };

  const isLoading = useAppSelector((state) => state.spotify.isLoading);

  useEffect(() => {
    if (currentPlayingSong) {
      audioPlayer.current.pause();
      audioPlayer.current.src = currentPlayingSong;
      audioPlayer.current.volume = 0.5;
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      audioPlayer.current.pause();
    };
  }, [currentPlayingSong]);

  return (
    <div className="flex flex-col mx-6 sm:mx-11 md:mx-20">
      {typeof songData === 'string' && (
        <h2 className="text-md text-center font-bold text-white">{songData}</h2>
      )}
      {typeof songData === 'object' && songData.length > 0 && !isLoading && (
        <>
          <motion.div
            initial="hidden"
            animate="show"
            variants={trackListVariants}
            className="grid lg:grid-cols-3 md:grid-cols-2 gap-x-3
      gap-y-5 xl:gap-x-6"
          >
            {songData.map((song) => {
              return <AppTrackCard key={song.id} song={song}></AppTrackCard>;
            })}
          </motion.div>
        </>
      )}
    </div>
  );
}

export default Track;
