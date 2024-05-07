// globalState/persist.js
import { persistReducer } from 'redux-persist';
import dataReducer from './dataSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, dataReducer);

export default persistedReducer;
