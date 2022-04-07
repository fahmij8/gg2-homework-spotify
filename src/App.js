import { useSelector } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import AppHeader from "components/AppHeader";
import AppFooter from "components/AppFooter";
import Login from "pages/Login";
import CreatePlaylist from "pages/CreatePlaylist";

function App() {
    const accessToken = useSelector((state) => state.account.accessToken);

    return (
        <div className="bg-gradient-to-br from-zinc-700/95 via-zinc-800 to-zinc-800 min-h-screen flex flex-col">
            <AppHeader></AppHeader>
            <div className="flex-grow">
                <Router>
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
                </Router>
            </div>
            <AppFooter></AppFooter>
        </div>
    );
}

export default App;
