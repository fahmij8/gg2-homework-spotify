import AppButton from './AppButton';
import {motion} from 'framer-motion';
import {faAnglesRight, faAnglesLeft} from '@fortawesome/free-solid-svg-icons';
import {useAppSelector, useAppDispatch} from 'hooks';
import {setSearchOffset} from 'store/spotifySlicer';
/**
 * AppPagination component
 * @return {JSX.Element}
 */
function AppPagination(): JSX.Element {
  const searchResult = useAppSelector((state) => state.spotify.searchResult);
  const searchOffset = useAppSelector((state) => state.spotify.searchOffset);
  const searchLimit = useAppSelector((state) => state.spotify.searchLimit);
  const isLoading = useAppSelector((state) => state.spotify.isLoading);
  const dispatch = useAppDispatch();

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}}>
      {!isLoading &&
        typeof searchResult === 'object' &&
        searchResult.length > 0 && (
          <div className="flex items-center justify-center mt-8">
            <AppButton
              buttonTheme="primary"
              buttonIcon={faAnglesLeft}
              buttonIconPosition="back"
              buttonSize="medium"
              buttonClass="rounded-full mr-2"
              buttonClick={() => {
                dispatch(
                  setSearchOffset(
                    searchOffset - 12 < 0 ? 0 : searchOffset - 12,
                  ),
                );
              }}
              disabled={searchOffset === 0}
            ></AppButton>
            <span className="mr-2 text-white">
              Page {Math.floor(searchOffset / 12) + 1} of{' '}
              {Math.ceil(searchLimit / 12) === 0
                ? 1
                : Math.ceil(searchLimit / 12)}
            </span>
            <AppButton
              buttonTheme="primary"
              buttonIcon={faAnglesRight}
              buttonIconPosition="front"
              buttonSize="medium"
              buttonClass="rounded-full"
              buttonClick={() => {
                dispatch(setSearchOffset(searchOffset + 12));
              }}
              disabled={searchOffset + 12 > searchLimit}
            ></AppButton>
          </div>
        )}
    </motion.div>
  );
}

export default AppPagination;
