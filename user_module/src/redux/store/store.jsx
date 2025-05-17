import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import authReducer from '../slices/authSlice';
import userReducer from '../slices/userSlice';
import articleReducer from '../slices/articleSlice';
import schoolReducer from '../slices/schoolSlice';
import consultantReducer from '../slices/consultantSlice';
import locationReducer from '../slices/locationSlice';
import videoReducer from '../slices/videoSlice';
import kidReducer from '../slices/kidSlice';
import eventReducer from '../slices/eventSlice';
//my import
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
//end
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'location'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  articles: articleReducer,
  schools: schoolReducer,
  consultants: consultantReducer,
  location: locationReducer,
  video: videoReducer,
  kids: kidReducer,
  events: eventReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
 // middleware: getDefaultMiddleware => getDefaultMiddleware(),
 
 middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

const persistor = persistStore(store);

export {store, persistor};
