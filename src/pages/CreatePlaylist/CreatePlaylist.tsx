import {useState, useEffect} from 'react';
import AppStepper from 'components/AppStepper';
import AppButton from 'components/AppButton';
import CreatePlaylistSearch from 'components/CreatePlaylistSearch';
import CreatePlaylistForm from 'components/CreatePlaylistForm';
import CreatePlaylistConfirm from 'components/CreatePlaylistConfirm';
import {MENU, fetchAPI, notify} from 'utils';
import {useAppSelector, useAppDispatch, useSpotifyApi} from 'hooks';
import {setUser} from 'store/accountSlicer';
import {
  setPlaylistName,
  setPlaylistDescription,
  setPlaylistTracks,
  setIsPlaylistCreated,
  setSearchResult,
  setCurrentPlayingSong,
  setIsTopTracks,
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
    activeStep === 1 &&
      dispatch(setSearchResult([])) &&
      dispatch(setCurrentPlayingSong(null)) &&
      dispatch(setIsTopTracks(true));
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
        <CreatePlaylistConfirm
          submitPlaylistResult={submitPlaylistResult}
          playlistName={playlistName}
          playlistDescription={playlistDescription}
          playlistTracks={playlistTracks}
        ></CreatePlaylistConfirm>
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
