function Track({ songData }) {
    return (
        <div className="max-w-xs overflow-hidden rounded-lg shadow-lg hover:shadow-2xl">
            <img
                className="w-full"
                src={songData.album.images[1].url}
                alt={songData.album.name}
            />
            <div className="px-6 py-4">
                <h4 className="text-xl font-semibold tracking-tight text-gray-800 hover:text-blue-500">
                    <a
                        href={songData.external_urls.spotify}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {songData.name}
                    </a>
                </h4>
                <p className="text-gray-700">
                    by
                    <a
                        href={songData.artists[0].external_urls.spotify}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-1 hover:text-blue-500"
                    >
                        {songData.artists[0].name}
                    </a>
                </p>
                <button className="mt-4 mr-0 ml-auto block h-10 px-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">
                    Select
                </button>
            </div>
        </div>
    );
}

export default Track;
