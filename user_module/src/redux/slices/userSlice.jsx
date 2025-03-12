import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import CONFIG from '../config/Config';

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

export const getUser = createAsyncThunk(
  'auth/users/getUsers',
  async (userId, {rejectWithValue}) => {
    const token = await getToken(rejectWithValue);
    try {
      const response = await axios.get(`${BASE_URL}/auth/get-users/${userId}`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred.');
    }
  },
);

export const uploadProfile = createAsyncThunk(
  'auth/users/uploadProfile',
  async ({source}, {rejectWithValue}) => {
    // Include userId in the arguments
    try {
      console.log('Starting profile upload...');

      const token = await getToken(rejectWithValue);
      if (!token) {
        console.error('Authentication token is missing.');
        return rejectWithValue('Authentication token is missing.');
      }

      const formData = new FormData();
      formData.append('profile', source);

      console.log('Sending request to backend...');
      const response = await axios.post(
        `${BASE_URL}/auth/upload-profile`, // No need to include userId in the URL
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log('Response from backend:', response);

      if (response.status !== 201) {
        console.error('Failed to upload profile:', response.data);
        return rejectWithValue(
          response.data?.message || 'Failed to upload profile.',
        );
      }

      console.log('Profile uploaded successfully!');
      return response.data.data;
    } catch (error) {
      console.error('Error uploading profile:', error);

      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            error.message ||
            'An error occurred.',
        );
      }
      return rejectWithValue(error.message || 'An error occurred.');
    }
  },
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(uploadProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(uploadProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
