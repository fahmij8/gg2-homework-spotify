import Search from '../Search';
import Tracks from '../Tracks';
import AppPagination from '../AppPagination';
import {useAppSelector} from 'hooks';
/**
 * CreatePlaylistSearch component
 * @return {JSX.Element}
 */
function CreatePlaylistSearch({
  mockResult,
}: {
  mockResult?: SpotifyApi.TrackObjectFull[];
}): JSX.Element {
  const searchResult = useAppSelector((state) => state.spotify.searchResult);
  return (
    <div className="my-5">
      <Search />
      <Tracks songData={mockResult ?? searchResult} />
      <AppPagination />
    </div>
  );
}

export default CreatePlaylistSearch;
