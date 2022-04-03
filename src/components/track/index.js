import AppTrackCard from "components/AppTrackCard";
import AppButton from "components/AppButton";
import { faAnglesRight, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";

function Track({
    playlist,
    setPlaylist,
    songData,
    searchOffset,
    setSearchOffset,
    withPagination,
}) {
    return (
        <div className="flex flex-col mx-6 sm:mx-11 md:mx-20">
            {typeof songData === "string" && (
                <h2 className="text-md text-center font-bold text-white">
                    {songData}
                </h2>
            )}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-x-3 gap-y-5 xl:gap-x-6">
                {typeof songData === "object" &&
                    songData.length > 0 &&
                    songData.map((song) => {
                        return (
                            <AppTrackCard
                                key={song.id}
                                song={song}
                                playlist={playlist}
                                setPlaylist={setPlaylist}
                            ></AppTrackCard>
                        );
                    })}
            </div>
            {typeof songData === "object" &&
                songData.length > 0 &&
                withPagination && (
                    <div className="flex items-center justify-center mt-8">
                        <div
                            className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg"
                            role="group"
                        >
                            {searchOffset > 0 && (
                                <AppButton
                                    buttonTheme="primary"
                                    buttonIcon={faAnglesLeft}
                                    buttonIconPosition="back"
                                    buttonSize="medium"
                                    buttonClass="rounded-full mr-2"
                                    buttonClick={() => {
                                        setSearchOffset(
                                            searchOffset - 10 < 0
                                                ? 0
                                                : searchOffset - 10
                                        );
                                    }}
                                ></AppButton>
                            )}
                            <AppButton
                                buttonTheme="primary"
                                buttonIcon={faAnglesRight}
                                buttonIconPosition="front"
                                buttonSize="medium"
                                buttonClass="rounded-full"
                                buttonClick={() => {
                                    setSearchOffset(searchOffset + 10);
                                }}
                            ></AppButton>
                        </div>
                    </div>
                )}
        </div>
    );
}

export default Track;
