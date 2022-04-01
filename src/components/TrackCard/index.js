function TrackCard({ song, playlist, setPlaylist }) {
    return (
        <div className="flex flex-row items-center border border-[#ffffff50] rounded-lg p-2 hover:bg-zinc-700 ">
            <div className="basis-14 shrink-0">
                <img
                    className="w-20 h-auto"
                    src={song.album.images[0].url}
                    alt={song.name}
                />
            </div>
            <div className="flex-grow pl-4">
                <h3 className="text-md font-bold text-white">{song.name}</h3>
                <h4 className="text-sm font-light text-white hover:underline w-fit">
                    <a href={song.artists[0].external_urls.spotify}>
                        {song.artists[0].name}
                    </a>
                </h4>
                {playlist.includes(song.uri) ? (
                    <button
                        type="button"
                        className="mt-1 rounded-lg inline-block p-1.5 px-2.5 bg-white text-zinc-500 font-medium text-xs leading-tight uppercase hover:bg-green-200 focus:bg-green-200 focus:outline-none focus:ring-0 transition ease-in-out duration-75 hover:scale-105"
                        onClick={() =>
                            setPlaylist(
                                playlist.filter((uri) => uri !== song.uri)
                            )
                        }
                    >
                        Deselect
                    </button>
                ) : (
                    <button
                        type="button"
                        className="mt-1 rounded-lg inline-block p-1.5 px-2.5 bg-green-600 text-zinc-50 font-medium text-xs leading-tight uppercase hover:bg-green-400 focus:bg-green-400 focus:outline-none focus:ring-0 transition ease-in-out duration-75 hover:scale-105"
                        onClick={() => setPlaylist([...playlist, song.uri])}
                    >
                        Select
                    </button>
                )}
            </div>
        </div>
    );
}

export default TrackCard;
