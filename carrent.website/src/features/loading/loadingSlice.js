import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  tokenWasRetrived: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState: initialState,
  reducers: {
    updateLoading: (state, action) => {
      const { isLoading } = action.payload;
      state.isLoading = isLoading;
    },
    updateRetriveTokenInfo: (state, action) => {
      state.tokenWasRetrived = action.payload;
    },
  },
});

export const { updateLoading, updateRetriveTokenInfo } = loadingSlice.actions;

export const selectIsLogin = (state) => loadingSlice.loading.isLoading;
export default loadingSlice.reducer;
