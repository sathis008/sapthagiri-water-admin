import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

export { persistReducer };
