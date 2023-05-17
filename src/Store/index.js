import { configureStore } from '@reduxjs/toolkit';

import { usersReducer } from './Slices/Users';
import { positionReducer } from './Slices/Position';

export default configureStore({
  reducer: {
    users: usersReducer,
    position: positionReducer,
  },
});