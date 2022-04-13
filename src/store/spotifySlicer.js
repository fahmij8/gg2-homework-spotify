import {createSlice} from '@reduxjs/toolkit';

export const spotifySlicer = createSlice({
  name: 'spotify',
  initialState: {
    searchResult: [],
    searchOffset: 0,
    playlistName: '',
    playlistDescription: '',
    playlistTracks: [],
    isTopTracks: false,
    isLoading: false,
    isPlaylistCreated: false,
  },
  reducers: {
    setSearchResult: (state, action) => {
      state.searchResult = action.payload;
    },
    setPlaylistName: (state, action) => {
      state.playlistName = action.payload;
    },
    setPlaylistDescription: (state, action) => {
      state.playlistDescription = action.payload;
    },
    setPlaylistTracks: (state, action) => {
      state.playlistTracks = action.payload;
    },
    setIsTopTracks: (state, action) => {
      state.isTopTracks = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsPlaylistCreated: (state, action) => {
      state.isPlaylistCreated = action.payload;
    },
  },
});

export const {
  setSearchResult,
  setPlaylistName,
  setPlaylistDescription,
  setPlaylistTracks,
  setIsTopTracks,
  setIsLoading,
} = spotifySlicer.actions;

export default spotifySlicer.reducer;
