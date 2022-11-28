import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer } from './tasksSlice';
import { filtersReducer } from './filtersSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistTasksConfig = {
  key: 'tasks',
  storage,
};

const persistedReducer = persistReducer(persistTasksConfig, tasksReducer);

export const store = configureStore({
  reducer: {
    tasks: persistedReducer,
    filters: filtersReducer,
  },
});

// export const persistor = persistStore(store);
