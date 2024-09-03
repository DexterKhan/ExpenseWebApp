import { configureStore } from '@reduxjs/toolkit';
import authenticationSlice from './authenticationSlice';
import expensesSlice from './expensesSlice';
import statisticsSlice from './statisticsSlice';
import ToastMiddleware from '../middlewares/ToastMiddleware';

export const store = configureStore({
  reducer: {
    authenticationSlice: authenticationSlice,
    expensesSlice: expensesSlice,
    statisticsSlice: statisticsSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ToastMiddleware)
});

export default store;