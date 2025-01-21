import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import CONFIG from '../config/Config';

const {BASE_URL} = CONFIG;

// Thunk to get articles
export const getArticles = createAsyncThunk(
  'article/getArticles',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/article/get-article`);
      console.log('API Response:', response.data);
      return response.data.articles;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to fetch articles.',
      );
    }
  },
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getArticles.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        console.log('Fetched Articles:', action.payload);
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(getArticles.rejected, (state, action) => {
        console.error('Failed to fetch articles:', action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default articlesSlice.reducer;
