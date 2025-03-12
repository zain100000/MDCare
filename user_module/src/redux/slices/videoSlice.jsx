import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONFIG from '../config/Config';

const {BASE_URL} = CONFIG;

// Helper to fetch token
const getToken = async rejectWithValue => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) throw new Error('User is not authenticated.');
    return token;
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to fetch token.');
  }
};

// Thunk to fetch videos
export const getVideos = createAsyncThunk(
  'video/get-videos',
  async (_, {rejectWithValue}) => {
    try {
      const token = await getToken(rejectWithValue);
      const response = await axios.get(`${BASE_URL}/video/get-videos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('API Response:', response.data);
      return response.data.videos; // Correctly extract the array of videos
    } catch (error) {
      console.error('Error fetching videos:', error);
      return rejectWithValue(error.response?.data || 'Failed to fetch videos.');
    }
  },
);

const videoSlice = createSlice({
  name: 'videos',
  initialState: {
    videos: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getVideos.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(getVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default videoSlice.reducer;
