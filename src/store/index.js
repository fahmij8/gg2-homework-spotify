import {configureStore} from '@reduxjs/toolkit';
import accountSlicer from './accountSlicer';

export default configureStore({
  reducer: {
    account: accountSlicer,
  },
});
