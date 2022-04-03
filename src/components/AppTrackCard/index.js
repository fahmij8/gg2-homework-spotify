import AppButton from "components/AppButton";

function TrackCard({ song, playlist, setPlaylist }) {
    return (
        <div className="flex flex-row items-center border border-[#ffffff50] rounded-lg p-2 hover:bg-zinc-700 ">
            <div className="basis-14 shrink-0">
                <img
                    className="w-20 h-auto"
                    src={song.album.images[0].url}
                    alt={song.album.name}
                    title={song.album.name}
                />
            </div>
            <div className="flex-grow pl-4">
                <h3 className="text-md font-bold text-white">{song.name}</h3>
                <h4 className="text-sm font-light text-white hover:underline w-fit">
                    <a href={song.artists[0].external_urls.spotify}>
                        {song.artists[0].name}
                    </a>
                </h4>
                {playlist.includes(song) ? (
                    <AppButton
                        buttonTheme="danger"
                        buttonText="Remove"
                        buttonSize="small"
                        buttonClick={() => {
                            setPlaylist(
                                playlist.filter(
                                    (eachTrack) => eachTrack !== song
                                )
                            );
                        }}
                        buttonClass="rounded-lg mt-1"
                    ></AppButton>
                ) : (
                    <AppButton
                        buttonTheme="primary"
                        buttonText="Add"
                        buttonSize="small"
                        buttonClick={() => {
                            setPlaylist([...playlist, song]);
                        }}
                        buttonClass="rounded-lg mt-1"
                    ></AppButton>
                )}
            </div>
        </div>
    );
}

export default TrackCard;
