import React from 'react';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState} from 'react';
import {fetchAPI} from 'utils/helper';
import AppInput from 'components/AppInput';
import AppButton from './AppButton';

/**
 * Search component
 * @param  {number} {searchOffset
 * @param  {void} setSearchOffset
 * @param  {void} setSearchResult
 * @return {JSX.Element}
 */
function Search({
  searchResult,
  searchOffset,
  setSearchOffset,
  setSearchResult,
}) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const debounced = setTimeout(() => {
      if (searchQuery) {
        fetchResults(searchOffset);
      } else {
        if (searchResult === '') {
          fetchAPI('/me/top/tracks').then((data) => {
            setSearchResult(data.items);
          });
        } else {
          setSearchResult('No search query');
        }
      }
    }, 500);

    return () => {
      clearTimeout(debounced);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchOffset, searchQuery]);

  const fetchResults = (searchOffsetArg) => {
    setSearchResult('Searching...');
    fetchAPI(
      `/search?q=${searchQuery}&type=track&limit=10` +
        `&market=ID&offset=${searchOffsetArg}`,
    )
      .then((data) => {
        if (typeof data.error !== 'undefined') {
          setSearchResult(data.error.message);
        } else {
          if (data.tracks.items.length > 0) {
            setSearchResult(data.tracks.items);
          } else {
            setSearchResult('No result found');
          }
        }
      })
      .catch((error) => {
        setSearchResult(`Something went wrong, please refresh the page`);
        console.error(error);
      });
  };

  return (
    <div className="flex justify-center">
      <div className="mb-3 md:max-w-md w-full mx-8">
        <form
          className="flex mb-4"
          onSubmit={(event) => {
            event.preventDefault();
            setSearchOffset(0);
            fetchResults(searchOffset);
          }}
        >
          <AppButton
            buttonTheme="secondary"
            buttonSize="medium"
            buttonType="submit"
            buttonIcon={faSearch}
            buttonIconPosition="front"
            buttonClass="rounded-l-lg bg-zinc-500 text-white"
          ></AppButton>
          <AppInput
            inputType="text"
            inputPlaceholder="Artist, Songs, or Albums"
            inputName="searchQuery"
            inputSize="medium"
            inputRequired={true}
            inputOnChange={(e) => setSearchQuery(e.target.value)}
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
