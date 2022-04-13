import React from 'react';
import AppInput from './AppInput';
import AppTextarea from './AppTextarea';

/**
 * CreatePlaylistForm component
 * @return {JSX.Element}
 */
function CreatePlaylistForm({
  playlistName,
  setPlaylistName,
  playlistDescription,
  setPlaylistDescription,
}) {
  return (
    <div className="my-5 max-w-xl min-w-[200px] block mx-auto px-5">
      <div className="flex justify-center">
        <div className="block p-6 w-full rounded-lg shadow-lg bg-zinc-700">
          <h5
            className="text-zinc-50 text-xl text-center
            leading-tight font-medium mb-2"
          >
            Enter your playlist detail
          </h5>
          <AppInput
            inputType="text"
            inputPlaceholder="Playlist Name"
            inputName="playlistName"
            inputLabel="Playlist Name"
            inputSize="medium"
            inputRequired={true}
            inputOnChange={(e) => setPlaylistName(e.target.value)}
            inputValue={playlistName}
            autoComplete="off"
            minLength="10"
          ></AppInput>
          <AppTextarea
            areaName="playlistDescription"
            areaLabel="Playlist Description"
            areaPlaceholder="Playlist Description"
            areaSize="5"
            areaRequired={true}
            areaOnChange={(e) => setPlaylistDescription(e.target.value)}
            areaValue={playlistDescription}
          ></AppTextarea>
        </div>
      </div>
    </div>
  );
}

export default CreatePlaylistForm;
