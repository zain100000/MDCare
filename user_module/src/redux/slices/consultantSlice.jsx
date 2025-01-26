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

// Thunk to get consultants
export const getConsultant = createAsyncThunk(
  'consultant/getConsultant',
  async (_, {rejectWithValue}) => {
    try {
      // Get the token
      const token = await getToken(rejectWithValue);

      // Make the API request with the token
      const response = await axios.get(
        `${BASE_URL}/api/consultant/get-consultant`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('API Response:', response.data);

      if (response.data && Array.isArray(response.data.consultants)) {
        return response.data.consultants;
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

const consultantSlice = createSlice({
  name: 'consultants',
  initialState: {
    consultants: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getConsultant.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getConsultant.fulfilled, (state, action) => {
        console.log('Fetched Consultants:', action.payload);
        state.loading = false;
        state.consultants = action.payload;
      })
      .addCase(getConsultant.rejected, (state, action) => {
        console.error('Failed to fetch consultants:', action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default consultantSlice.reducer;
