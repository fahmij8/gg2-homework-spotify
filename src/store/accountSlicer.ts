import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {AccountState} from 'types';

const initialState: AccountState = {
  accessToken: '',
  tokenType: '',
  user: null,
};

export const accountSlicer = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setTokenType: (state, action: PayloadAction<string>) => {
      state.tokenType = action.payload;
    },
    setUser: (
      state,
      action: PayloadAction<SpotifyApi.UserObjectPrivate | null>,
    ) => {
      state.user = action.payload;
    },
  },
});

export const {setAccessToken, setTokenType, setUser} = accountSlicer.actions;

export default accountSlicer.reducer;
