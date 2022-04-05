import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { fetchAPI } from "../../utils/helper";

function Search({ searchOffset, setSearchOffset, setSearchResult }) {
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        let debounced = setTimeout(() => {
            if (searchQuery) {
                fetchResults(searchOffset);
            }
        }, 500);

        return () => {
            clearTimeout(debounced);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchOffset, searchQuery]);

    const fetchResults = (searchOffsetArg) => {
        setSearchResult("Searching...");
        fetchAPI(
            `/search?q=${searchQuery}&type=track&limit=10&market=ID&offset=${searchOffsetArg}`
        )
            .then((data) => {
                if (typeof data.error !== "undefined") {
                    setSearchResult(data.error.message);
                } else {
                    if (data.tracks.items.length > 0) {
                        setSearchResult(data.tracks.items);
                    } else {
                        setSearchResult("No result found");
                    }
                }
            })
            .catch((error) => {
                setSearchResult(
                    `Something went wrong, please refresh the page`
                );
                console.error(error);
            });
    };

    return (
        <div className="flex justify-center">
            <div className="mb-3 md:max-w-md w-full mx-8">
                <form
                    className="input-group relative flex flex-wrap items-stretch w-full mb-4"
                    onSubmit={(event) => {
                        event.preventDefault();
                        setSearchOffset(0);
                        fetchResults(searchOffset);
                    }}
                >
                    <input
                        type="search"
                        className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 outline-none focus:outline-none focus:shadow-none shadow-none"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="button-search"
                        onChange={(event) => setSearchQuery(event.target.value)}
                    />
                    <button
                        className="btn px-6 py-2.5 bg-green-400 text-neutral-800 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-300 hover:shadow-lg focus:bg-green-300  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-300 active:shadow-lg transition ease-in-out duration-75 hover:scale-105 flex items-center"
                        type="submit"
                        id="button-search"
                    >
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Search;
