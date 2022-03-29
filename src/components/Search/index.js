import { Component } from "react";

class Search extends Component {
    state = {
        searchQuery: "",
        offset: this.props.offset || 0,
    };

    handleSearch = (event) => {
        event.preventDefault();
        this.fetchResults();
    };

    componentDidUpdate(prevProps) {
        if (prevProps.offset !== this.props.offset) {
            this.setState({
                offset: this.props.offset,
            });
            this.fetchResults();
        }
    }

    fetchResults = () => {
        this.props.searchResult("Searching...");
        fetch(
            `https://api.spotify.com/v1/search?q=${this.state.searchQuery}&type=track&limit=10&market=ID&offset=${this.state.offset}`,
            {
                headers: {
                    Authorization: this.props.authorization,
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.tracks.items.length > 0) {
                    this.props.searchResult(data.tracks.items);
                } else {
                    this.props.searchResult("No result found");
                }
            })
            .catch((error) => {
                this.props.searchResult(
                    "Something went wrong, please refresh the page."
                );
                console.error(error);
            });
    };

    render() {
        return (
            <div className="flex justify-center">
                <div className="mb-3 xl:w-96">
                    <form
                        className="input-group relative flex flex-wrap items-stretch w-full mb-4"
                        onSubmit={this.handleSearch}
                    >
                        <input
                            type="search"
                            className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 outline-none focus:outline-none focus:shadow-none shadow-none"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="button-search"
                            onChange={(event) =>
                                this.setState({
                                    searchQuery: event.target.value,
                                })
                            }
                        />
                        <button
                            className="btn px-6 py-2.5 bg-green-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                            type="submit"
                            id="button-search"
                        >
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="search"
                                className="w-4"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                                ></path>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Search;
