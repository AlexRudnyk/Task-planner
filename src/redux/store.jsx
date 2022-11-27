import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer } from './tasksSlice';
import { filtersReducer } from './filtersSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistTasksConfig = {
  key: 'tasks',
  storage,
};

const persistFiltersConfig = {
  key: 'filters',
  storage,
};

const persistedTasksReducer = persistReducer(persistTasksConfig, tasksReducer);
const persistedFiltersReducer = persistReducer(
  persistFiltersConfig,
  filtersReducer
);

export const store = configureStore({
  reducer: {
    tasks: persistedTasksReducer,
    filters: persistedFiltersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// export const persistor = persistStore(store);
