import type { UserFillsResponse } from "@nktkas/hyperliquid";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: { userFills: UserFillsResponse } = {
  userFills: [],
};

export const userFillsSlice = createSlice({
  name: "userFills",
  initialState: initialState,
  reducers: {
    setUserFills: (state, action: PayloadAction<UserFillsResponse>) => {
      console.log(action.payload);
      state.userFills = action.payload;

      console.log("state", state.userFills);
    },
  },
});

export const { setUserFills } = userFillsSlice.actions;

export default userFillsSlice.reducer;
