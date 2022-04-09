import {createSlice} from '@reduxjs/toolkit';

export const accountSlicer = createSlice({
  name: 'account',
  initialState: {
    accessToken: '',
    tokenType: '',
    userId: '',
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setTokenType: (state, action) => {
      state.tokenType = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const {setAccessToken, setTokenType, setUserId} =
  accountSlicer.actions;

export default accountSlicer.reducer;
