import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAccessToken, setTokenType, setUserId } from "./store/accountSlicer";
import { MENU, fetchAPI } from "./utils";
import AppHeader from "./components/AppHeader";
import AppStepper from "./components/AppStepper";
import AppButton from "./components/AppButton";
import AppInput from "./components/AppInput";
import AppTextarea from "./components/AppTextarea";
import Footer from "./components/AppFooter";
import Track from "./components/Tracks";
import Search from "./components/Search";
import Login from "./components/Login";
import {
    faCheck,
    faChevronCircleRight,
    faChevronCircleLeft,
} from "@fortawesome/free-solid-svg-icons";

function App() {
    const accessToken = useSelector((state) => state.account.accessToken);
    const tokenType = useSelector((state) => state.account.tokenType);
    const userId = useSelector((state) => state.account.userId);
    const [activeStep, setActiveStep] = useState(0);
    const [searchResult, setSearchResult] = useState(
        "Let's search something to add to your playlist"
    );
    const [searchOffset, setSearchOffset] = useState(0);
    const [playlistName, setPlaylistName] = useState("");
    const [playlistDescription, setPlaylistDescription] = useState("");
    const [playlistTracks, setPlaylistTracks] = useState([]);
    const [submitPlaylistResult, setSubmitPlaylistResult] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {
        if (accessToken) {
            window.history.replaceState({}, "", "/");
            fetchAPI("/me")
                .then((data) => {
                    dispatch(setUserId(data.id));
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            let urlParams = window.location.hash.substring(1).split("&");
            let params = {};
            urlParams.forEach((param) => {
                let keyValue = param.split("=");
                params[keyValue[0]] = keyValue[1];
            });
            params.access_token &&
                dispatch(setAccessToken(params.access_token));
            params.token_type && dispatch(setTokenType(params.token_type));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken]);

    const createPlaylist = () => {
        if (playlistName && playlistDescription && playlistTracks.length > 0) {
            fetchAPI(
                `/users/${userId}/playlists`,
                {
                    name: playlistName,
                    description: playlistDescription,
                    public: false,
                },
                "POST"
            )
                .then((addPlaylist) => {
                    if (typeof addPlaylist.error !== "undefined") {
                        console.error(addPlaylist.error.message);
                        setSubmitPlaylistResult({
                            status: "error",
                            message: addPlaylist.error.message,
                        });
                    } else {
                        let playlistId = addPlaylist.id;
                        fetchAPI(
                            `/playlists/${playlistId}/tracks`,
                            {
                                uris: playlistTracks.map((track) => track.uri),
                            },
                            "POST"
                        )
                            .then((data) => {
                                if (typeof data.error !== "undefined") {
                                    console.error(data.error.message);
                                    setSubmitPlaylistResult({
                                        status: "error",
                                        message: data.error.message,
                                    });
                                } else {
                                    setSubmitPlaylistResult({
                                        status: "success",
                                        message: `Playlist created successfully`,
                                        url: addPlaylist.external_urls.spotify,
                                    });
                                    setPlaylistName("");
                                    setPlaylistDescription("");
                                    setPlaylistTracks([]);
                                }
                            })
                            .catch((error) => {
                                console.error(error);
                                setSubmitPlaylistResult({
                                    status: "error",
                                    message:
                                        "Something wrong happened, please refresh the page",
                                });
                            });
                    }
                })
                .catch((error) => {
                    console.error(error);
                    setSubmitPlaylistResult({
                        status: "error",
                        message:
                            "Something wrong happened, please refresh the page",
                    });
                });
        }
    };

    return (
        <div className="bg-zinc-800 min-h-screen flex flex-col" id="main">
            <AppHeader></AppHeader>
            <div className="flex-grow">
                {accessToken ? (
                    <div className="mb-8">
                        <AppStepper
                            steps={MENU}
                            activeStep={activeStep}
                        ></AppStepper>
                        {activeStep === 0 && (
                            <div className="my-5 block mx-auto">
                                <AppInput
                                    inputType="text"
                                    inputPlaceholder="Playlist Name"
                                    inputName="playlistName"
                                    inputLabel="Playlist Name"
                                    inputSize="medium"
                                    inputRequired={true}
                                    inputOnChange={(e) =>
                                        setPlaylistName(e.target.value)
                                    }
                                    inputValue={playlistName}
                                ></AppInput>
                                <AppTextarea
                                    areaName="playlistDescription"
                                    areaLabel="Playlist Description"
                                    areaPlaceholder="Playlist Description"
                                    areaSize="5"
                                    areaRequired={true}
                                    areaOnChange={(e) =>
                                        setPlaylistDescription(e.target.value)
                                    }
                                    areaValue={playlistDescription}
                                ></AppTextarea>
                            </div>
                        )}
                        {activeStep === 1 && (
                            <div className="my-5">
                                <Search
                                    authorization={`${tokenType} ${accessToken}`}
                                    setSearchResult={setSearchResult}
                                    searchOffset={searchOffset}
                                    setSearchOffset={setSearchOffset}
                                />
                                <Track
                                    playlist={playlistTracks}
                                    setPlaylist={setPlaylistTracks}
                                    songData={searchResult}
                                    searchOffset={searchOffset}
                                    setSearchOffset={setSearchOffset}
                                    withPagination={true}
                                ></Track>
                            </div>
                        )}
                        {activeStep === 2 && (
                            <div className="my-5">
                                <div className="block mx-auto max-w-md w-auto text-center text-white mb-6">
                                    {submitPlaylistResult.status ===
                                        "success" && (
                                        <div
                                            className="bg-green-100 rounded-lg py-5 px-6 mb-6 text-base text-green-700"
                                            role="alert"
                                        >
                                            {submitPlaylistResult.message}
                                            <a
                                                href={submitPlaylistResult.url}
                                                className="bg-green-500 hover:bg-green-600 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white block mx-auto w-fit mt-3 transition ease-in-out duration-75 hover:scale-105"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                View here
                                            </a>
                                        </div>
                                    )}
                                    {submitPlaylistResult.status ===
                                        "error" && (
                                        <div
                                            className="bg-red-100 rounded-lg py-5 px-6 mb-6 text-base text-red-700"
                                            role="alert"
                                        >
                                            {submitPlaylistResult.message}
                                        </div>
                                    )}
                                    <h1 className="font-bold text-lg leading-tight">
                                        Your Playlist Details :
                                    </h1>
                                    <h2 className="font-normal text-md leading-tight">
                                        Playlist Name :{" "}
                                        {playlistName || "Please enter a name"}
                                    </h2>
                                    <p className="font-normal text-md leading-tight">
                                        Playlist Description :{" "}
                                        {playlistDescription ||
                                            "Please enter a description"}
                                    </p>
                                </div>
                                <Track
                                    playlist={playlistTracks}
                                    setPlaylist={setPlaylistTracks}
                                    songData={
                                        playlistTracks.length > 0
                                            ? playlistTracks
                                            : "Please select some tracks"
                                    }
                                    withPagination={false}
                                ></Track>
                            </div>
                        )}
                        <div className="mx-6 sm:mx-11 md:mx-20 flex justify-end my-7">
                            {activeStep > 0 && (
                                <AppButton
                                    buttonTheme="primary"
                                    buttonText="Previous Step"
                                    buttonSize="medium"
                                    buttonClick={() =>
                                        setActiveStep(activeStep - 1)
                                    }
                                    buttonClass="mr-5 rounded-lg"
                                    buttonIcon={faChevronCircleLeft}
                                    buttonIconPosition="back"
                                ></AppButton>
                            )}
                            {activeStep < MENU.length - 1 && (
                                <AppButton
                                    buttonTheme="primary"
                                    buttonText="Next Step"
                                    buttonSize="medium"
                                    buttonClick={() =>
                                        setActiveStep(activeStep + 1)
                                    }
                                    buttonClass="rounded-lg"
                                    buttonIcon={faChevronCircleRight}
                                    buttonIconPosition="front"
                                ></AppButton>
                            )}
                            {activeStep === MENU.length - 1 && (
                                <AppButton
                                    buttonTheme={"primary"}
                                    buttonText="Finish"
                                    buttonSize="medium"
                                    buttonClass="rounded-lg"
                                    buttonIcon={faCheck}
                                    buttonIconPosition="back"
                                    buttonClick={() => {
                                        createPlaylist();
                                    }}
                                ></AppButton>
                            )}
                        </div>
                    </div>
                ) : (
                    <Login></Login>
                )}
            </div>
            <Footer></Footer>
        </div>
    );
}

export default App;
