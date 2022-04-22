import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {SpotifyAppState} from 'types';

const initialState: SpotifyAppState = {
  searchResult: [],
  searchOffset: 0,
  searchLimit: 0,
  playlistName: '',
  playlistDescription: '',
  playlistTracks: [],
  isTopTracks: true,
  isLoading: false,
  isPlaylistCreated: false,
  currentPlayingSong: null,
};

export const spotifySlicer = createSlice({
  name: 'spotify',
  initialState,
  reducers: {
    setSearchResult: (
      state,
      action: PayloadAction<SpotifyAppState['searchResult']>,
    ) => {
      state.searchResult = action.payload;
    },
    setSearchOffset: (
      state,
      action: PayloadAction<SpotifyAppState['searchOffset']>,
    ) => {
      state.searchOffset = action.payload;
    },
    setSearchLimit: (
      state,
      action: PayloadAction<SpotifyAppState['searchLimit']>,
    ) => {
      state.searchLimit = action.payload;
    },
    setPlaylistName: (
      state,
      action: PayloadAction<SpotifyAppState['playlistName']>,
    ) => {
      state.playlistName = action.payload;
    },
    setPlaylistDescription: (
      state,
      action: PayloadAction<SpotifyAppState['playlistDescription']>,
    ) => {
      state.playlistDescription = action.payload;
    },
    setPlaylistTracks: (
      state,
      action: PayloadAction<SpotifyAppState['playlistTracks']>,
    ) => {
      state.playlistTracks = action.payload;
    },
    setIsTopTracks: (
      state,
      action: PayloadAction<SpotifyAppState['isTopTracks']>,
    ) => {
      state.isTopTracks = action.payload;
    },
    setIsLoading: (
      state,
      action: PayloadAction<SpotifyAppState['isLoading']>,
    ) => {
      state.isLoading = action.payload;
    },
    setIsPlaylistCreated: (
      state,
      action: PayloadAction<SpotifyAppState['isPlaylistCreated']>,
    ) => {
      state.isPlaylistCreated = action.payload;
    },
    setCurrentPlayingSong: (
      state,
      action: PayloadAction<SpotifyAppState['currentPlayingSong']>,
    ) => {
      state.currentPlayingSong = action.payload;
    },
  },
});

export const {
  setSearchResult,
  setSearchOffset,
  setSearchLimit,
  setPlaylistName,
  setPlaylistDescription,
  setPlaylistTracks,
  setIsTopTracks,
  setIsLoading,
  setIsPlaylistCreated,
  setCurrentPlayingSong,
} = spotifySlicer.actions;

export default spotifySlicer.reducer;
