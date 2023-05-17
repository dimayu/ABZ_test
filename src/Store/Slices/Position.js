import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosition = createAsyncThunk(
  'position',
  async function() {
    try {
      const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions');
      
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
  position: {
    items: [],
    status: 'loading',
  }
};

const positionSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {},
  extraReducers: {
    //Getting
    [fetchPosition.pending]: (state) => {
      state.position.items = [];
      state.position.status = 'loading';
    },
    [fetchPosition.fulfilled]: (state, action) => {
      state.position.items = action.payload;
      state.position.status = 'loaded';
    },
    [fetchPosition.rejected]: (state) => {
      state.position.items = [];
      state.position.status = 'error';
    },
  }
});

export const positionReducer = positionSlice.reducer;