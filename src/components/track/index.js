function millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function Track({ songData, pagination }) {
    const handlePrev = () => {
        pagination(-10);
    };

    const handleNext = () => {
        pagination(10);
    };

    return (
        <div className="flex flex-col mx-6 sm:mx-11 md:mx-14">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full">
                            <thead className="bg-transparent border-b border-white/20">
                                <tr>
                                    <th
                                        scope="col"
                                        className="text-sm font-medium text-white px-6 py-4 text-center w-[10px]"
                                    >
                                        #
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-sm font-medium text-white px-6 py-4 text-left min-w-[200px]"
                                    >
                                        Title
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-sm font-medium text-white px-6 py-4 text-left min-w-[200px]"
                                    >
                                        Album
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-sm font-medium text-white px-6 py-4 text-center max-w-[5%]"
                                    >
                                        Duration
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {typeof songData === "string" ? (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="text-center text-white px-6 py-4"
                                        >
                                            {songData}
                                        </td>
                                    </tr>
                                ) : (
                                    songData.map((song, index) => {
                                        return (
                                            <tr
                                                className="bg-transparent transition duration-300 ease-in-out hover:bg-gray-100/10"
                                                key={song.id}
                                            >
                                                <td className="px-6 py-4 whitespace-normal text-sm font-light text-white text-center">
                                                    {index + 1}
                                                </td>
                                                <td className="text-sm text-white font-light px-6 py-4 whitespace-normal">
                                                    <div className="flex flex-row items-center">
                                                        <img
                                                            src={
                                                                song.album
                                                                    .images[0]
                                                                    .url
                                                            }
                                                            alt={
                                                                song.album.name
                                                            }
                                                            className="w-11 h-11 mr-4"
                                                        />
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-medium text-white">
                                                                {song.name}
                                                            </span>
                                                            <div className="inline max-w-fit">
                                                                <a
                                                                    href={
                                                                        song
                                                                            .artists[0]
                                                                            .external_urls
                                                                            .spotify
                                                                    }
                                                                    className="inline-block text-sm font-light text-white/80 hover:text-white hover:underline"
                                                                >
                                                                    {
                                                                        song
                                                                            .artists[0]
                                                                            .name
                                                                    }
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-sm text-white font-light px-6 py-4 whitespace-normal">
                                                    <a
                                                        className="inline-block text-sm font-light text-white/80 hover:text-white hover:underline"
                                                        href={
                                                            song.album
                                                                .external_urls
                                                                .spotify
                                                        }
                                                    >
                                                        {song.album.name}
                                                    </a>
                                                </td>
                                                <td className="text-sm text-white font-light px-6 py-4 whitespace-normal text-center">
                                                    <span className="text-white/80">
                                                        {millisToMinutesAndSeconds(
                                                            song.duration_ms
                                                        )}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                        <div className="flex items-center justify-center mt-8">
                            <div
                                className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg"
                                role="group"
                            >
                                <button
                                    type="button"
                                    className="mr-5 rounded-l inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase hover:bg-green-700 focus:bg-green-700 focus:outline-none focus:ring-0 active:bg-green-800 transition duration-150 ease-in-out"
                                    onClick={handlePrev}
                                >
                                    Previous
                                </button>
                                <button
                                    type="button"
                                    className=" inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase hover:bg-green-700 focus:bg-green-700 focus:outline-none focus:ring-0 active:bg-green-800 transition duration-150 ease-in-out"
                                    onClick={handleNext}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Track;