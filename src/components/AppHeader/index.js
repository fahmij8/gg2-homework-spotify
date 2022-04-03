import spotifyLogo from "../../images/Spotify_Logo.png";

function AppHeader() {
    return (
        <div className="pt-8 bg-gradient-to-b from-green-700 via-green-900 to-zinc-800">
            <img
                src={spotifyLogo}
                alt="Spotify Logo"
                className="w-[170px] block mx-auto"
            />
            <h1 className="text-xl text-center font-semibold text-white mt-2 mb-3">
                Playlist Maker
            </h1>
        </div>
    );
}

export default AppHeader;
