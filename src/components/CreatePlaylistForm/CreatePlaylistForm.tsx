import AppInput from '../AppInput';
import AppTextarea from '../AppTextarea';
import {useAppDispatch, useAppSelector} from 'hooks';
import {setPlaylistName, setPlaylistDescription} from 'store/spotifySlicer';
import {motion} from 'framer-motion';
import {pagesVariant} from 'utils';

/**
 * CreatePlaylistForm component
 * @return {JSX.Element}
 */
function CreatePlaylistForm(): JSX.Element {
  const playlistName = useAppSelector((state) => state.spotify.playlistName);
  const playlistDescription = useAppSelector(
    (state) => state.spotify.playlistDescription,
  );
  const dispatch = useAppDispatch();

  return (
    <motion.div
      className="my-5 max-w-xl min-w-[200px] block mx-auto px-5"
      variants={pagesVariant}
      initial="initial"
      animate="animated"
    >
      <div className="flex justify-center">
        <div className="block w-full">
          <h5
            className={
              `text-zinc-50 mb-2 text-xl text-center ` +
              `leading-tight font-medium`
            }
          >
            Enter your playlist details
          </h5>
          <h6 className="text-zinc-50 my-0 text-xs text-center">
            By default, your playlist will be private and non-collaborative.
          </h6>
          <AppInput
            inputType="text"
            inputPlaceholder="Playlist Name"
            inputName="playlistName"
            inputLabel="Playlist Name"
            inputSize="medium"
            inputRequired={true}
            inputOnChange={(e) => dispatch(setPlaylistName(e.target.value))}
            inputValue={playlistName}
            autoComplete="off"
          ></AppInput>
          {playlistName.length > 0 && playlistName.length < 10 && (
            <p className="text-red-600 text-sm my-2">
              Playlist name must be at least 10 characters long
            </p>
          )}
          <AppTextarea
            areaName="playlistDescription"
            areaLabel="Playlist Description"
            areaPlaceholder="Playlist Description"
            areaSize={5}
            areaRequired={true}
            areaOnChange={(e) =>
              dispatch(setPlaylistDescription(e.target.value))
            }
            areaValue={playlistDescription}
          ></AppTextarea>
          {playlistDescription.length > 0 &&
            playlistDescription.length < 10 && (
              <p className="text-red-600 text-sm my-2">
                Playlist description must be at least 10 characters long
              </p>
            )}
        </div>
      </div>
    </motion.div>
  );
}

export default CreatePlaylistForm;
