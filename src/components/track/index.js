import TrackCard from "components/TrackCard";
import { useState } from "react";

function Track({ songData, searchOffset, setSearchOffset }) {
    const [playlist, setPlaylist] = useState([]);

    return (
        <div className="flex flex-col mx-6 sm:mx-11 md:mx-20">
            {typeof songData === "string" && (
                <h1 className="text-3xl text-center font-bold text-white">
                    {songData}
                </h1>
            )}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-x-3 gap-y-5 xl:gap-x-6">
                {typeof songData === "object" &&
                    songData.map((song) => {
                        return (
                            <TrackCard
                                key={song.id}
                                song={song}
                                playlist={playlist}
                                setPlaylist={setPlaylist}
                            ></TrackCard>
                        );
                    })}
            </div>
            {typeof songData === "object" && songData.length > 0 && (
                <div className="flex items-center justify-center mt-8">
                    <div
                        className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg"
                        role="group"
                    >
                        {searchOffset > 0 && (
                            <button
                                type="button"
                                className="rounded-lg mr-5 inline-block px-6 py-2.5 bg-green-400 text-slate-800 font-medium text-xs leading-tight uppercase hover:bg-green-300 focus:bg-green-300 focus:outline-none focus:ring-0 active:bg-green-300 transition ease-in-out duration-75 hover:scale-105"
                                onClick={() => {
                                    setSearchOffset(
                                        searchOffset - 10 < 0
                                            ? 0
                                            : searchOffset - 10
                                    );
                                }}
                            >
                                Previous
                            </button>
                        )}
                        <button
                            type="button"
                            className="rounded-lg inline-block px-6 py-2.5 bg-green-400 text-neutral-800 font-medium text-xs leading-tight uppercase hover:bg-green-300 focus:bg-green-300 focus:outline-none focus:ring-0 active:bg-green-300 transition ease-in-out duration-75 hover:scale-105"
                            onClick={() => {
                                setSearchOffset(searchOffset + 10);
                            }}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Track;
