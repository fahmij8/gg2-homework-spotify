import { useState, useEffect } from "react";
import AppHeader from "components/AppHeader";
import Footer from "components/AppFooter";
import Track from "components/Track";
import Search from "components/Search";
import Login from "components/Login";

function App() {
    const [accessToken, setAccessToken] = useState(null);
    const [tokenType, setTokenType] = useState(null);
    const [searchResult, setSearchResult] = useState(
        "Let's search something to add to your playlist"
    );
    const [searchOffset, setSearchOffset] = useState(0);

    useEffect(() => {
        if (accessToken) {
            window.history.replaceState({}, "", "/");
        } else {
            let urlParams = window.location.hash.substring(1).split("&");
            let params = {};
            urlParams.forEach((param) => {
                let keyValue = param.split("=");
                params[keyValue[0]] = keyValue[1];
            });
            setAccessToken(params.access_token);
            setTokenType(params.token_type);
        }
    }, [accessToken]);

    return (
        <div className="bg-zinc-800 min-h-screen flex flex-col">
            <AppHeader></AppHeader>
            <div className="flex-grow">
                {accessToken ? (
                    <div className="my-8">
                        <Search
                            authorization={`${tokenType} ${accessToken}`}
                            setSearchResult={setSearchResult}
                            searchOffset={searchOffset}
                            setSearchOffset={setSearchOffset}
                        />
                        <Track
                            songData={searchResult}
                            searchOffset={searchOffset}
                            setSearchOffset={setSearchOffset}
                        ></Track>
                    </div>
                ) : (
                    <Login></Login>
                )}
            </div>
            <Footer></Footer>
        </div>
    );
}

export default App;
