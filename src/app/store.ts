import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import todosSlice from './todosSlice';

export const store = configureStore({
  reducer: {
    todos: todosSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type RootState = ReturnType<typeof store.getState>;




