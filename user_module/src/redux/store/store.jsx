import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import authReducer from '../slices/authSlice';
import userReducer from '../slices/userSlice';
import articleReducer from '../slices/articleSlice';
import waitinglistReducer from '../slices/waitinglistSlice';
import waitinglistConsultantReducer from '../slices/waitinglistConsultantSlice';
import locationReducer from '../slices/locationSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  articles: articleReducer,
  waitinglist: waitinglistReducer,
  waitinglistconsultant: waitinglistConsultantReducer,
  location: locationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

const persistor = persistStore(store);

export {store, persistor};
