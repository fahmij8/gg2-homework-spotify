import Tracks from 'components/Tracks';
import {motion} from 'framer-motion';
import {pagesVariant} from 'utils';

/**
 *
 * Create Playlist Confirmation Sub Page
 * @return {JSX.Element}
 */
function CreatePlaylistConfirm({
  submitPlaylistResult,
  playlistName,
  playlistDescription,
  playlistTracks,
}: {
  submitPlaylistResult:
    | {
        status: string;
        message: string;
        url: string;
      }
    | {};
  playlistName: string;
  playlistDescription: string;
  playlistTracks: SpotifyApi.TrackObjectFull[];
}): JSX.Element {
  return (
    <motion.div
      className="my-5"
      variants={pagesVariant}
      initial="initial"
      animate="animated"
    >
      <div className="block mx-auto max-w-md w-auto text-center text-white mb-6">
        {'status' in submitPlaylistResult &&
          submitPlaylistResult.status === 'success' && (
            <div
              className="bg-green-100 rounded-lg py-5 px-6 mb-6 text-base
                text-green-700"
              role="alert"
            >
              {submitPlaylistResult.message}. To repeat, please refresh the
              page.
              <a
                href={submitPlaylistResult.url}
                className="bg-green-500 hover:bg-green-600 px-5 py-2 text-sm leading-5
                  rounded-full font-semibold text-white block mx-auto w-fit mt-3
                  transition ease-in-out duration-75 hover:scale-105"
                target="_blank"
                rel="noopener noreferrer"
              >
                View here
              </a>
            </div>
          )}
        {'status' in submitPlaylistResult &&
          submitPlaylistResult.status === 'error' && (
            <div
              className="bg-red-100 rounded-lg py-5 px-6 mb-6 text-base text-red-700"
              role="alert"
            >
              {submitPlaylistResult.message}
            </div>
          )}
        {!('status' in submitPlaylistResult) && (
          <>
            <h1 className="font-bold text-lg leading-tight">
              Your Playlist Details :
            </h1>
            <h2 className="font-normal text-md leading-tight">
              Playlist Name : {playlistName || 'Please enter a name'}
            </h2>
            <p className="font-normal text-md leading-tight">
              Playlist Description :{' '}
              {playlistDescription || 'Please enter a description'}
            </p>
          </>
        )}
      </div>
      {!('status' in submitPlaylistResult) && (
        <>
          {playlistTracks.length > 0 ? (
            <Tracks songData={playlistTracks}></Tracks>
          ) : (
            <div className="text-center text-white">
              <h1 className="font-bold text-lg leading-tight">
                Please add at least one track
              </h1>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}

export default CreatePlaylistConfirm;
