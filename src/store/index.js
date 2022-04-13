import {configureStore} from '@reduxjs/toolkit';
import accountSlicer from './accountSlicer';
import spotifySlicer from './spotifySlicer';

export default configureStore({
  reducer: {
    account: accountSlicer,
    spotify: spotifySlicer,
  },
});
