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

export const addKid = createAsyncThunk(
  'kid/addKid',
  async (kidData, {rejectWithValue}) => {
    const token = await getToken(rejectWithValue);
    try {
      const response = await axios.post(`${BASE_URL}/kid/add-kid`, kidData, {
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to create maintenance request.',
      );
    }
  },
);

export const getAllKids = createAsyncThunk(
  'kid/getAllKids',
  async (_, {rejectWithValue}) => {
    const token = await getToken(rejectWithValue);
    try {
      const response = await axios.get(`${BASE_URL}/kid/get-all-kids`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      return response.data.kids;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to fetch kids info.',
      );
    }
  },
);

export const getKidById = createAsyncThunk(
  'kid/getKidById',
  async (id, {rejectWithValue}) => {
    const token = await getToken(rejectWithValue);

    try {
      const response = await axios.get(
        `${BACKEND_API_URL}/kid/get-kid-by-id/${id}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );

      return response.data.kid;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred.');
    }
  },
);

const kidSlice = createSlice({
  name: 'kids',
  initialState: {
    kids: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder

      .addCase(addKid.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addKid.fulfilled, (state, action) => {
        state.loading = false;
        state.kids.push(action.payload);
      })
      .addCase(addKid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllKids.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllKids.fulfilled, (state, action) => {
        state.loading = false;
        state.kids = action.payload;
      })
      .addCase(getAllKids.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getKidById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getKidById.fulfilled, (state, action) => {
        state.loading = false;
        state.kids = action.payload;
      })
      .addCase(getKidById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default kidSlice.reducer;
