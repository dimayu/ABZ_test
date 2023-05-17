import { configureStore } from '@reduxjs/toolkit';

import { usersReducer } from './Slices/Users';

export default configureStore({
  reducer: {
    users: usersReducer,
  },
});