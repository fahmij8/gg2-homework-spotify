import {useState, useEffect} from 'react';
import AppStepper from 'components/AppStepper';
import AppButton from 'components/AppButton';
import CreatePlaylistSearch from 'components/CreatePlaylistSearch';
import CreatePlaylistForm from 'components/CreatePlaylistForm';
import Tracks from 'components/Tracks';
import {MENU, fetchAPI} from 'utils';
import {useAppSelector, useAppDispatch} from 'hooks';
import {setUserId} from 'store/accountSlicer';
import {
  setPlaylistName,
  setPlaylistDescription,
  setPlaylistTracks,
  setIsPlaylistCreated,
  setSearchResult,
} from 'store/spotifySlicer';
import {
  faCheck,
  faChevronCircleRight,
  faChevronCircleLeft,
} from '@fortawesome/free-solid-svg-icons';
import toast, {Toaster} from 'react-hot-toast';
import type {Toast} from 'react-hot-toast';

/**
 * CreatePlaylist component
 * @return {JSX.Element}
 */
function CreatePlaylist(): JSX.Element {
  const userId = useAppSelector((state) => state.account.userId);
  const playlistName = useAppSelector((state) => state.spotify.playlistName);
  const playlistDescription = useAppSelector(
    (state) => state.spotify.playlistDescription,
  );
  const playlistTracks = useAppSelector(
    (state) => state.spotify.playlistTracks,
  );
  const isPlaylistCreated = useAppSelector(
    (state) => state.spotify.isPlaylistCreated,
  );
  const [activeStep, setActiveStep] = useState(0);
  const [submitPlaylistResult, setSubmitPlaylistResult] = useState<
    | {
        status: string;
        message: string;
        url: string;
      }
    | {}
  >({});

  const dispatch = useAppDispatch();

  const notify = (message: string, type: 'success' | 'error') => {
    const CONFIG_NOTIFY: Partial<Toast> = {
      position: 'bottom-center',
      style: {
        background: '#333',
        color: '#fff',
      },
      duration: 5000,
    };
    if (type === 'success') {
      toast.success(message, CONFIG_NOTIFY);
    } else if (type === 'error') {
      toast.error(message, CONFIG_NOTIFY);
    }
  };

  useEffect(() => {
    fetchAPI('/me')
      .then((data) => {
        dispatch(setUserId(data.id));
      })
      .catch((error) => {
        notify('Error getting user data!', 'error');
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    activeStep === 1 && dispatch(setSearchResult([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  const createPlaylist = () => {
    if (playlistName && playlistDescription && playlistTracks.length > 0) {
      fetchAPI(
        `/users/${userId}/playlists`,
        {
          name: playlistName,
          description: playlistDescription,
          public: false,
        },
        'POST',
      )
        .then((addPlaylist) => {
          if (typeof addPlaylist.error !== 'undefined') {
            console.error(addPlaylist.error);
            setSubmitPlaylistResult({
              status: 'error',
              message: addPlaylist.error.message,
            });
          } else {
            const playlistId = addPlaylist.id;
            fetchAPI(
              `/playlists/${playlistId}/tracks`,
              {
                uris: playlistTracks.map(
                  (track: SpotifyApi.TrackObjectFull) => track.uri,
                ),
              },
              'POST',
            )
              .then((data) => {
                if (typeof data.error !== 'undefined') {
                  console.error(data.error);
                  setSubmitPlaylistResult({
                    status: 'error',
                    message: data.error.message,
                  });
                } else {
                  setSubmitPlaylistResult({
                    status: 'success',
                    message: `Playlist created successfully`,
                    url: addPlaylist.external_urls.spotify,
                  });
                  dispatch(setPlaylistName(''));
                  dispatch(setPlaylistDescription(''));
                  dispatch(setPlaylistTracks([]));
                  dispatch(setIsPlaylistCreated(true));
                  notify('Playlist Created!', 'success');
                }
              })
              .catch((error) => {
                console.error(error);
                notify(
                  'Something unexpected happen, please refresh the page',
                  'error',
                );
              });
          }
        })
        .catch((error) => {
          console.error(error);
          notify(
            'Something unexpected happen, please refresh the page',
            'error',
          );
        });
    } else if (userId === '') {
      notify(
        `Sorry, your user id are not listed on our end. 
        Please contact author for further information`,
        'error',
      );
    } else if (!playlistName) {
      notify('Please enter a playlist name', 'error');
    } else if (!playlistDescription) {
      notify('Please enter a playlist description', 'error');
    } else if (playlistTracks.length === 0) {
      notify('Please add at least one track', 'error');
    }
  };

  return (
    <div className="mb-8">
      <AppStepper steps={MENU} activeStep={activeStep}></AppStepper>
      {activeStep === 0 && <CreatePlaylistSearch />}
      {activeStep === 1 && <CreatePlaylistForm />}
      {activeStep === 2 && (
        <div className="my-5">
          <div className="block mx-auto max-w-md w-auto text-center text-white mb-6">
            {'status' in submitPlaylistResult &&
              submitPlaylistResult.status === 'success' && (
                <div
                  className="bg-green-100 rounded-lg py-5 px-6 mb-6 text-base
                text-green-700"
                  role="alert"
                >
                  {submitPlaylistResult.message}
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
        </div>
      )}
      <div
        className="max-w-xl min-w-[200px] mx-auto px-5
      flex justify-end my-7"
      >
        {activeStep > 0 && !isPlaylistCreated && (
          <AppButton
            buttonTheme="primary"
            buttonText="Previous Step"
            buttonSize="medium"
            buttonClick={() => setActiveStep(activeStep - 1)}
            buttonClass="mr-5 rounded-lg"
            buttonIcon={faChevronCircleLeft}
            buttonIconPosition="back"
          ></AppButton>
        )}
        {activeStep < MENU.length - 1 && !isPlaylistCreated && (
          <AppButton
            buttonTheme="primary"
            buttonText="Next Step"
            buttonSize="medium"
            buttonClick={() => setActiveStep(activeStep + 1)}
            buttonClass="rounded-lg"
            buttonIcon={faChevronCircleRight}
            buttonIconPosition="front"
          ></AppButton>
        )}
        {activeStep === MENU.length - 1 && !isPlaylistCreated && (
          <AppButton
            buttonTheme={'primary'}
            buttonText="Finish"
            buttonSize="medium"
            buttonClass="rounded-lg"
            buttonIcon={faCheck}
            buttonIconPosition="back"
            buttonClick={() => {
              createPlaylist();
            }}
          ></AppButton>
        )}
      </div>
      <Toaster />
    </div>
  );
}

export default CreatePlaylist;
