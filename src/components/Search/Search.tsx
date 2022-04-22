import {faSearch, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState} from 'react';
import {fetchAPI} from 'utils/helper';
import AppInput from 'components/AppInput';
import AppButton from '../AppButton';
import {useAppDispatch, useAppSelector} from 'hooks';
import {
  setSearchResult,
  setSearchOffset,
  setIsTopTracks,
  setIsLoading,
  setSearchLimit,
} from 'store/spotifySlicer';
/**
 * Search component
 * @return {JSX.Element}
 */
function Search(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const searchOffset = useAppSelector((state) => state.spotify.searchOffset);
  const isTopTracks = useAppSelector((state) => state.spotify.isTopTracks);
  const isLoading = useAppSelector((state) => state.spotify.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchResults(searchOffset);
    }, 500);
    return () => clearTimeout(debounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchOffset, searchQuery]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
    searchOffset > 0 && dispatch(setSearchOffset(0));
    if (e.target.value) {
      isTopTracks && dispatch(setIsTopTracks(false));
    } else {
      !isTopTracks && dispatch(setIsTopTracks(true));
    }
  };

  const fetchResults = (searchOffsetArg: number) => {
    dispatch(setIsLoading(true));
    let uri;
    if (isTopTracks) {
      uri = `/me/top/tracks?limit=12&offset=${searchOffsetArg}`;
    } else {
      uri =
        `/search?q=${searchQuery}&type=track&limit=12` +
        `&market=ID&offset=${searchOffsetArg}`;
    }
    fetchAPI(uri)
      .then((data) => {
        if (typeof data.error !== 'undefined') {
          dispatch(setSearchResult(data.error.message));
        } else {
          if (isTopTracks) {
            dispatch(setSearchResult(data.items));
            dispatch(setSearchLimit(data.total));
          } else {
            if (data.tracks.items.length > 0) {
              dispatch(setSearchResult(data.tracks.items));
              dispatch(setSearchLimit(data.tracks.total));
            } else {
              dispatch(setSearchResult('No result found'));
            }
          }
        }
        dispatch(setIsLoading(false));
      })
      .catch((error) => {
        dispatch(
          setSearchResult(`Something went wrong, please refresh the page`),
        );
        console.error(error);
        dispatch(setIsLoading(false));
      });
  };

  return (
    <div className="flex justify-center">
      <div className="mb-3 md:max-w-md w-full mx-8">
        <form
          className="flex mb-4"
          onSubmit={(event) => {
            event.preventDefault();
            dispatch(setSearchOffset(0));
            fetchResults(searchOffset);
          }}
        >
          <AppButton
            buttonTheme="secondary"
            buttonSize="medium"
            buttonType="submit"
            buttonIcon={isLoading ? faSpinner : faSearch}
            buttonIconPosition="front"
            buttonClass="rounded-l-lg bg-zinc-500 text-white"
            buttonIconClassName={isLoading ? 'fa-spin' : ''}
            disabled={isLoading}
          ></AppButton>
          <AppInput
            inputType="text"
            inputPlaceholder="Artist, Songs, or Albums"
            inputName="searchQuery"
            inputSize="medium"
            inputRequired={true}
            inputOnChange={handleSearchInput}
            inputValue={searchQuery}
            inputClassName="w-full rounded-none rounded-r-lg focus:!ring-0"
            autoComplete="off"
          ></AppInput>
        </form>
      </div>
    </div>
  );
}

export default Search;
