import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'users',
  async function(count) {
    try {
      const response = await fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?&count=${count}`);
      
      if (!response.ok) {
        throw new Error('Server Error!');
      }
      const data = await response.json();
      
      return data;
    } catch (error) {
      return (error.message);
    }
  }
);

const initialState = {
  users: {
    items: [],
    status: 'loading',
  }
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    //Getting
    [fetchUsers.pending]: (state) => {
      state.users.items = [];
      state.users.status = 'loading';
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.users.items = action.payload;
      state.users.status = 'loaded';
    },
    [fetchUsers.rejected]: (state) => {
      state.users.items = [];
      state.users.status = 'error';
    },
  }
});

export const usersReducer = usersSlice.reducer;