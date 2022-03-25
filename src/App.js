import playlistData from "data";
import Track from "components/track";

function App() {
    return (
        <div className="bg-zinc-800 min-h-screen py-6">
            <h1 className="text-3xl text-center mt-0 font-semibold text-white">
                My Playlist
            </h1>
            <p className="text-center font-light text-white mt-0 mb-3">
                by Fahmi Jabbar (KM_G2FE4088)
            </p>
            <Track songData={playlistData}></Track>
        </div>
    );
}

export default App;
