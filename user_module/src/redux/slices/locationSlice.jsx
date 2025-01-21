import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONFIG from '../config/Config';

const {BASE_URL} = CONFIG;

// Async thunk to update location
export const updateLocation = createAsyncThunk(
  'location/updateLocation',
  async ({latitude, longitude}, {rejectWithValue}) => {
    try {
      console.log('Updating location with latitude:', latitude, 'longitude:', longitude);

      const token = await AsyncStorage.getItem('authToken');
      console.log('Auth token retrieved:', token);

      if (!token) {
        console.log('Token not found');
        return rejectWithValue('Token not found');
      }

      const response = await axios.post(
        `${BASE_URL}/api/auth/update-location-user`,
        {latitude, longitude},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Location update response:', response.data);

      // Return response data to update the Redux state
      return response.data;
    } catch (error) {
      console.error('Error updating location:', error);
      return rejectWithValue(
        error.response?.data || {message: 'Unknown error occurred.'},
      );
    }
  },
);

// Slice for location
const locationSlice = createSlice({
  name: 'location',
  initialState: {
    location: null,
    address: null,
    isTracking: false,
    loading: false,
    error: null,
  },
  reducers: {
    toggleTracking: state => {
      state.isTracking = !state.isTracking;
    },
    resetLocationState: state => {
      state.location = null;
      state.address = null;
      state.isTracking = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(updateLocation.pending, state => {
        state.loading = true;
        state.error = null;
        console.log('Location update pending...');
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        console.log('Location update successful:', action.payload);
        state.loading = false;
        state.location = action.payload.location;
        state.address = action.payload.address;
        state.isTracking = true;
      })
      .addCase(updateLocation.rejected, (state, action) => {
        console.error('Location update failed:', action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {toggleTracking, resetLocationState} = locationSlice.actions;

export default locationSlice.reducer;
