import {useState, useEffect} from 'react';
import AppStepper from 'components/AppStepper';
import AppButton from 'components/AppButton';
import CreatePlaylistSearch from 'components/CreatePlaylistSearch';
import CreatePlaylistForm from 'components/CreatePlaylistForm';
import Tracks from 'components/Tracks';
import {MENU, fetchAPI, notify} from 'utils';
import {useAppSelector, useAppDispatch, useSpotifyApi} from 'hooks';
import {setUser} from 'store/accountSlicer';
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
import {Toaster} from 'react-hot-toast';

/**
 * CreatePlaylist component
 * @return {JSX.Element}
 */
function CreatePlaylist(): JSX.Element {
  const warnNotWhitelistedUser = (): void => {
    notify('Your email is not whitelisted', 'error');
    notify('Send your email to address below and get whitelisted', 'error');
    notify('fahmijabbar12@gmail.com', 'error');
  };

  const dispatch = useAppDispatch();
  const {data, error} = useSpotifyApi<SpotifyApi.UserObjectPrivate>('/me');
  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    } else if (error) {
      warnNotWhitelistedUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  const user = useAppSelector((state) => state.account.user?.id);
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

  useEffect(() => {
    activeStep === 1 && dispatch(setSearchResult([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  const createPlaylist = () => {
    if (!user) return warnNotWhitelistedUser();
    if (!playlistName || playlistName.length < 10) {
      return notify('Playlist name must be at least 10 characters', 'error');
    }
    if (!playlistDescription || playlistDescription.length < 10) {
      return notify(
        'Playlist description must be at least 10 characters',
        'error',
      );
    }
    if (!playlistTracks || playlistTracks.length < 1) {
      return notify('Playlist must have at least 1 track', 'error');
    }
    fetchAPI(
      `/users/${user}/playlists`,
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
          notify('Playlist not created', 'error');
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
                notify('Tracks not added to playlist', 'error');
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
        notify('Something unexpected happen, please refresh the page', 'error');
      });
  };

  return (
    <div className="mb-8">
      <Toaster />
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
    </div>
  );
}

export default CreatePlaylist;
