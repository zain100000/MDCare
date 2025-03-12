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

// Thunk to get school
export const getSchool = createAsyncThunk(
  'school/getSchool',
  async (_, {rejectWithValue}) => {
    try {
      // Get the token
      const token = await getToken(rejectWithValue);

      // Make the API request with the token
      const response = await axios.get(`${BASE_URL}/school/get-school`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('API Response:', response.data);

      if (response.data && Array.isArray(response.data.schools)) {
        return response.data.schools;
      }
      throw new Error('Invalid API response format');
    } catch (error) {
      console.error('API Error:', error);
      return rejectWithValue(
        error.response?.data || 'Failed to fetch consultants.',
      );
    }
  },
);

const schoolSlice = createSlice({
  name: 'schools',
  initialState: {
    schools: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getSchool.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSchool.fulfilled, (state, action) => {
        console.log('Fetched Schools:', action.payload);
        state.loading = false;
        state.schools = action.payload;
      })
      .addCase(getSchool.rejected, (state, action) => {
        console.error('Failed to fetch schools:', action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default schoolSlice.reducer;
