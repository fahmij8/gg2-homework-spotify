import React, {useState, useEffect} from 'react';
import AppStepper from 'components/AppStepper';
import AppInput from 'components/AppInput';
import AppButton from 'components/AppButton';
import AppTextarea from 'components/AppTextarea';
import Track from 'components/Tracks';
import Search from 'components/Search';
import {MENU, fetchAPI} from 'utils';
import {useSelector, useDispatch} from 'react-redux';
import {setUserId} from 'store/accountSlicer';
import {
  faCheck,
  faChevronCircleRight,
  faChevronCircleLeft,
} from '@fortawesome/free-solid-svg-icons';
import toast, {Toaster} from 'react-hot-toast';
/**
 * CreatePlaylist component
 * @return {JSX.Element}
 */
function CreatePlaylist() {
  const userId = useSelector((state) => state.account.userId);
  const [activeStep, setActiveStep] = useState(0);
  const [searchResult, setSearchResult] = useState('');
  const [searchOffset, setSearchOffset] = useState(0);
  const [playlistName, setPlaylistName] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [submitPlaylistResult, setSubmitPlaylistResult] = useState({});

  const dispatch = useDispatch();

  const notify = (message, type) => {
    const CONFIG_NOTIFY = {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
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
                uris: playlistTracks.map((track) => track.uri),
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
                  setPlaylistName('');
                  setPlaylistDescription('');
                  setPlaylistTracks([]);
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
      {activeStep === 0 && (
        <div className="my-5 max-w-xl min-w-[200px] block mx-auto px-5">
          <div className="flex justify-center">
            <div className="block p-6 w-full rounded-lg shadow-lg bg-zinc-700">
              <h5
                className="text-zinc-50 text-xl text-center
              leading-tight font-medium mb-2"
              >
                Enter your playlist detail
              </h5>
              <AppInput
                inputType="text"
                inputPlaceholder="Playlist Name"
                inputName="playlistName"
                inputLabel="Playlist Name"
                inputSize="medium"
                inputRequired={true}
                inputOnChange={(e) => setPlaylistName(e.target.value)}
                inputValue={playlistName}
                autoComplete="off"
              ></AppInput>
              <AppTextarea
                areaName="playlistDescription"
                areaLabel="Playlist Description"
                areaPlaceholder="Playlist Description"
                areaSize="5"
                areaRequired={true}
                areaOnChange={(e) => setPlaylistDescription(e.target.value)}
                areaValue={playlistDescription}
              ></AppTextarea>
            </div>
          </div>
        </div>
      )}
      {activeStep === 1 && (
        <div className="my-5">
          <Search
            searchResult={searchResult}
            setSearchResult={setSearchResult}
            searchOffset={searchOffset}
            setSearchOffset={setSearchOffset}
          />
          <Track
            playlist={playlistTracks}
            setPlaylist={setPlaylistTracks}
            songData={searchResult}
            searchOffset={searchOffset}
            setSearchOffset={setSearchOffset}
            withPagination={true}
          ></Track>
        </div>
      )}
      {activeStep === 2 && (
        <div className="my-5">
          <div className="block mx-auto max-w-md w-auto text-center text-white mb-6">
            {submitPlaylistResult.status === 'success' && (
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
            {submitPlaylistResult.status === 'error' && (
              <div
                className="bg-red-100 rounded-lg py-5 px-6 mb-6 text-base text-red-700"
                role="alert"
              >
                {submitPlaylistResult.message}
              </div>
            )}
            {submitPlaylistResult.status === undefined && (
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
          {submitPlaylistResult.status === undefined && (
            <>
              <Track
                playlist={playlistTracks}
                setPlaylist={setPlaylistTracks}
                songData={
                  playlistTracks.length > 0
                    ? playlistTracks
                    : 'Please select some tracks'
                }
                withPagination={false}
              ></Track>
            </>
          )}
        </div>
      )}
      <div
        className="max-w-xl min-w-[200px] mx-auto px-5
      flex justify-end my-7"
      >
        {activeStep > 0 && (
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
        {activeStep < MENU.length - 1 && (
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
        {activeStep === MENU.length - 1 && (
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
