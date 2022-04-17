import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {AccountState} from 'types';

const initialState: AccountState = {
  accessToken: '',
  tokenType: '',
  userId: '',
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
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
});

export const {setAccessToken, setTokenType, setUserId} = accountSlicer.actions;

export default accountSlicer.reducer;
