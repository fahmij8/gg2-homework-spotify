import {LOGIN_URL} from 'utils';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpotify} from '@fortawesome/free-brands-svg-icons';

/**
 * Login component
 * @return {JSX.Element}
 */
function Login(): JSX.Element {
  return (
    <div className="mx-6 pb-16">
      <h2 className="text-3xl text-center font-semibold text-white">
        Login first to use the service
      </h2>
      <a
        href={LOGIN_URL}
        className={
          `bg-green-500 hover:bg-green-600 px-5 py-2 text-sm` +
          `leading-5 rounded-full font-semibold text-white block mx-auto` +
          ` w-fit mt-5 transition ease-in-out duration-75 hover:scale-105`
        }
      >
        <FontAwesomeIcon icon={faSpotify} className="mr-1"></FontAwesomeIcon>
        Login with Spotify
      </a>
    </div>
  );
}

export default Login;
