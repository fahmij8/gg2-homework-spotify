import Logo from 'components/Logo';
import spotifyLogo from 'images/Spotify_Logo.png';
import userPicture from 'images/user.png';
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
      {isLoggedIn && (
        <>
          <div className="flex justify-end px-8">
            <div>
              <div className="dropdown relative">
                <button
                  className={
                    `dropdown-toggle inline-block px-2 py-1 rounded-full ` +
                    `bg-zinc-800 text-white font-medium text-sm leading-tight ` +
                    `shadow-md hover:bg-zinc-800 hover:shadow-lg ` +
                    `focus:bg-zinc-800 focus:shadow-lg focus:outline-none focus:ring-0 ` +
                    `active:bg-zinc-800 active:shadow-lg active:text-white transition ` +
                    `duration-150 ease-in-out flex items-center whitespace-nowrap` +
                    `focus:outline-none focus:ring-2 focus:ring-offset-2 ` +
                    `focus:ring-offset-zinc-800 focus:ring-white`
                  }
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open user menu</span>
                  <span className="text-white mx-2 font-bold">
                    {!user ? 'User' : user.display_name}
                  </span>
                  <img
                    alt="User Profile"
                    className="h-6 w-5 rounded-full mr-1"
                    src={
                      !user
                        ? userPicture
                        : user.images && user.images.length > 0
                        ? user.images[0].url
                        : userPicture
                    }
                  />
                </button>
                <ul
                  className={
                    `dropdown-menu min-w-max absolute hidden bg-white !right-0 !top-1.5` +
                    ` text-base z-50 float-right py-2 list-none text-right rounded-lg ` +
                    `shadow-lg mt-1 hidden m-0 bg-clip-padding border-none bg-zinc-600`
                  }
                  aria-labelledby="dropdownMenuButton"
                >
                  <h6
                    className={
                      `text-gray-400 font-semibold text-sm py-2 px-4 ` +
                      `block w-full whitespace-nowrap bg-transparent`
                    }
                  >
                    {!user ? 0 : user.followers ? user.followers.total : 0}{' '}
                    Followers
                    {user && user.product === 'open'
                      ? ' - Free User'
                      : user &&
                        user.product === 'premium' && (
                          <>
                            {' - '}
                            <span className="text-yellow-300">
                              Premium User
                            </span>
                          </>
                        )}
                  </h6>
                  <li>
                    <button
                      className={
                        `dropdown-item text-sm py-2 px-4 font-normal block ` +
                        `w-full whitespace-nowrap bg-transparent text-gray-300 ` +
                        `hover:bg-zinc-500 hover:text-white focus:text-white ` +
                        `focus:bg-zinc-500 active:bg-green-600 text-right`
                      }
                      onClick={() => {
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('token_type');
                        localStorage.removeItem('expires_in');
                        window.location.href = '/';
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full max-w-[300px] block mx-auto mt-4 md:mt-0">
            <Logo></Logo>
          </div>
        </>
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
