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
  'api/auth/users/getUsers',
  async (userId, {rejectWithValue}) => {
    const token = await getToken(rejectWithValue);
    try {
      const response = await axios.get(
        `${BASE_URL}/api/auth/get-users/${userId}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred.');
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
      });
  },
});

export default userSlice.reducer;
