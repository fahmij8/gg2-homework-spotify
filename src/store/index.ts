import {configureStore} from '@reduxjs/toolkit';
import accountSlicer from './accountSlicer';
import spotifySlicer from './spotifySlicer';

export const store = configureStore({
  reducer: {
    account: accountSlicer,
    spotify: spotifySlicer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
