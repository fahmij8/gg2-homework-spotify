import { Component } from "react";
import playlistData from "data";
import Track from "components/Track";
import Search from "components/Search";
import Login from "components/Login";
class App extends Component {
    state = {
        user: {
            isLoggedIn: false,
            access_token: null,
            token_type: null,
            expires_in: null,
            state: null,
            error: null,
        },
        search: {
            result: null || playlistData,
            offset: 0,
        },
    };

    componentDidMount() {
        // Check if there's query string in the url
        let urlParams = window.location.hash.substring(1).split("&");
        if (urlParams.length > 1) {
            urlParams.forEach((param, index) => {
                const [key, value] = param.split("=");
                this.setState((prevState) => {
                    return {
                        user: {
                            ...prevState.user,
                            [key]: value,
                        },
                    };
                });
                if (index === urlParams.length - 1) {
                    this.setState((prevState) => {
                        return {
                            user: {
                                ...prevState.user,
                                isLoggedIn: true,
                            },
                        };
                    });
                }
            });
        }
    }

    componentDidUpdate() {
        console.log(this.state);
        // Cleanup URL after updated state
        if (this.state.user.isLoggedIn) {
            window.history.replaceState({}, "", "/");
        }
    }

    handleSearchResult = (resultSearch) => {
        this.setState({
            search: {
                result: resultSearch,
                offset: 0,
            },
        });
    };

    handlePagination = (offset) => {
        this.setState((prevState) => {
            return {
                search: {
                    offset:
                        prevState.search.offset + offset <= 0
                            ? 0
                            : prevState.search.offset + offset,
                    result: "Searching...",
                },
            };
        });
    };

    render() {
        return (
            <div className="bg-zinc-800 min-h-screen py-6">
                <h1 className="text-3xl text-center mt-0 font-semibold text-white">
                    My Playlist
                </h1>
                <p className="text-center font-light text-white mt-0 mb-3">
                    by Fahmi Jabbar (KM_G2FE4088)
                </p>
                {this.state.user.isLoggedIn ? (
                    <div className="mt-8">
                        <Search
                            authorization={`${this.state.user.token_type} ${this.state.user.access_token}`}
                            offset={this.state.search.offset}
                            searchResult={this.handleSearchResult}
                        />
                        <Track
                            songData={this.state.search.result}
                            pagination={this.handlePagination}
                        ></Track>
                    </div>
                ) : (
                    <Login></Login>
                )}
            </div>
        );
    }
}

export default App;
