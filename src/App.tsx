import {Switch, Route, Redirect} from 'react-router-dom';
import {useAppSelector} from 'hooks';
import AppHeader from 'components/AppHeader';
import AppFooter from 'components/AppFooter';
import Login from 'pages/Login';
import CreatePlaylist from 'pages/CreatePlaylist';
import {useSpotifyAuth} from 'hooks';

/**
 * App component
 * @return {JSX.Element}
 */
function App(): JSX.Element {
  useSpotifyAuth();
  const accessToken = useAppSelector((state) => state.account.accessToken);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage:
          `linear-gradient(to right bottom, #205234, #1b4b37, #1a4337, #1d3c36, ` +
          `#213432, #223031, #242d2e, #26292a, #26292a, #26282a, #26282a, #27272a)`,
      }}
    >
      <AppHeader></AppHeader>
      <div className="flex-grow">
        <Switch>
          <Route path="/create-playlist">
            {accessToken ? (
              <CreatePlaylist></CreatePlaylist>
            ) : (
              <Redirect push to="/"></Redirect>
            )}
          </Route>
          <Route exact path="/">
            {accessToken ? (
              <Redirect push to="/create-playlist"></Redirect>
            ) : (
              <Login></Login>
            )}
          </Route>
          <Route path="*">
            <Redirect to="/"></Redirect>
          </Route>
        </Switch>
      </div>
      <AppFooter></AppFooter>
    </div>
  );
}

export default App;
