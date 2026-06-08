import { configureStore } from "@reduxjs/toolkit";
import userFillsReducer from "./slices/userFillsSlice";

export const store = configureStore({
  reducer: {
    userFills: userFillsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
