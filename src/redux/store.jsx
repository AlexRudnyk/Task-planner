import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer } from './tasksSlice';
import { filtersReducer } from './filtersSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { combineReducers } from 'redux';

const persistTasksConfig = {
  key: 'tasks',
  storage,
  blacklist: ['filters'],
};

const rootReducer = combineReducers({
  tasks: tasksReducer,
  filters: filtersReducer,
});

const persistedTasksReducer = persistReducer(persistTasksConfig, rootReducer);

export const store = configureStore({
  reducer: {
    tasks: persistedTasksReducer,
    filters: persistedTasksReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
