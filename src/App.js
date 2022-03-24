import "./App.css";
import playlistData from "./data";
import Track from "components/track";

function App() {
    return (
        <div className="App">
            <h1 className="text-3xl text-center mt-3 mb-0 font-semibold text-gray-800">
                My Playlist
            </h1>
            <p className="text-center font-light text-gray-800 mt-0 mb-3">
                by Fahmi Jabbar (KM_G2FE4088)
            </p>
            <div className="py-4">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center">
                        <Track songData={playlistData}></Track>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
