import axios from 'axios';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import CONFIG from '../config/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {BASE_URL} = CONFIG;

const getToken = async rejectWithValue => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) throw new Error('User is not authenticated.');
    return token;
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to fetch token.');
  }
};

// Thunk to get events
export const getAllEvents = createAsyncThunk(
  'event/getAllEvents',
  async (_, {rejectWithValue}) => {
    try {
      // Get the token
      const token = await getToken(rejectWithValue);

      // Make the API request with the token
      const response = await axios.get(`${BASE_URL}/event/get-all-events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('API Response:', response.data);

      if (response.data && Array.isArray(response.data.events)) {
        return response.data.events;
      }
      throw new Error('Invalid API response format');
    } catch (error) {
      console.error('API Error:', error);
      return rejectWithValue(error.response?.data || 'Failed to fetch events.');
    }
  },
);

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllEvents.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        console.log('Fetched Events:', action.payload);
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(getAllEvents.rejected, (state, action) => {
        console.error('Failed to fetch events:', action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default eventSlice.reducer;
