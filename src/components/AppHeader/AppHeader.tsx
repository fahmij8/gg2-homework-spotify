import Logo from 'components/Logo';
import spotifyLogo from 'images/Spotify_Logo.png';
import {useAppSelector} from 'hooks';

/**
 * AppHeader component
 * @return {JSX.Element}
 */
function AppHeader(): JSX.Element {
  const isLoggedIn = useAppSelector((state) => state.account.accessToken);
  const user = useAppSelector((state) => state.account.user);

  return (
    <div className="pt-8">
      {isLoggedIn && user && (
        <div className="flex flex-row justify-evenly">
          <h5 className="text-white font-weight-bold">
            Good Morning, {user.display_name}!
          </h5>
        </div>
      )}
      {!isLoggedIn && (
        <>
          <div className="w-full max-w-[300px] block mx-auto">
            <Logo></Logo>
          </div>
          <h1 className="text-xl text-center font-semibold text-white mt-2 mb-3">
            Your
            <img
              src={spotifyLogo}
              alt="Spotify"
              className="inline w-[100px] ml-2"
            />{' '}
            Playlist Maker
          </h1>
        </>
      )}
    </div>
  );
}

export default AppHeader;
