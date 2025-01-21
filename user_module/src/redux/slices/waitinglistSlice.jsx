import axios from 'axios';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import CONFIG from '../config/Config';

const {BASE_URL} = CONFIG;

// Thunk to get waiting list
export const getWaitinglist = createAsyncThunk(
  'waitinglist/getWaitinglist',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/school/waitinglist`);
      console.log('API Response:', response.data);

      if (response.data && Array.isArray(response.data.waitingList)) {
        return response.data.waitingList;
      }
      throw new Error('Invalid API response format');
    } catch (error) {
      console.error('API Error:', error);
      return rejectWithValue(
        error.response?.data || 'Failed to fetch waiting list.',
      );
    }
  },
);

const waitinglistSlice = createSlice({
  name: 'waitinglist',
  initialState: {
    waitinglist: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getWaitinglist.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWaitinglist.fulfilled, (state, action) => {
        console.log('Fetched Schools:', action.payload);
        state.loading = false;
        state.waitinglist = action.payload;
      })
      .addCase(getWaitinglist.rejected, (state, action) => {
        console.error('Failed to fetch schools:', action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default waitinglistSlice.reducer;
