import AppTrackCard from '../AppTrackCard';
import {motion} from 'framer-motion';
import {useAppSelector} from 'hooks';

/**
 * Tracks component
 * @return {JSX.Element}
 */
function Track({
  songData,
}: {
  songData: SpotifyApi.TrackObjectFull[] | [] | string;
}): JSX.Element {
  const trackListVariants = {
    hidden: {opacity: 0},
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.09,
      },
    },
  };

  const isTopTracks = useAppSelector((state) => state.spotify.isTopTracks);
  const isLoading = useAppSelector((state) => state.spotify.isLoading);

  return (
    <div className="flex flex-col mx-6 sm:mx-11 md:mx-20">
      {typeof songData === 'string' && (
        <h2 className="text-md text-center font-bold text-white">{songData}</h2>
      )}
      {typeof songData === 'object' && songData.length > 0 && !isLoading && (
        <>
          {isTopTracks && (
            <h6 className="text-md text-center font-normal text-white mb-5">
              Displaying your top tracks
            </h6>
          )}
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
