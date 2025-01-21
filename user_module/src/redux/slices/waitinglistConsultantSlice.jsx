import axios from 'axios';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import CONFIG from '../config/Config';

const {BASE_URL} = CONFIG;

// Thunk to get waiting list
export const getWaitinglistConsultant = createAsyncThunk(
  'waitinglistconsultant/getWaitinglistConsultant',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/consultant/get-waitinglist-consultant`,
      );
      console.log('API Response:', response.data);

      if (response.data && Array.isArray(response.data.waitinglistconsultant)) {
        return response.data.waitinglistconsultant;
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

const waitinglistConsultantSlice = createSlice({
  name: 'waitinglistconsultant',
  initialState: {
    waitinglist: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getWaitinglistConsultant.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWaitinglistConsultant.fulfilled, (state, action) => {
        console.log('Fetched Consultants:', action.payload);
        state.loading = false;
        state.waitinglist = action.payload;
      })
      .addCase(getWaitinglistConsultant.rejected, (state, action) => {
        console.error('Failed to fetch consultants:', action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default waitinglistConsultantSlice.reducer;
