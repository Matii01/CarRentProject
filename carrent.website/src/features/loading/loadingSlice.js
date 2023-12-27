import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState: initialState,
  reducers: {
    updateLoading: (state, action) => {
      const { isLoading } = action.payload;
      state.isLoading = isLoading;
    },
  },
});

export const { updateLoading } = loadingSlice.actions;

export const selectIsLogin = (state) => loadingSlice.loading.isLoading;
export default loadingSlice.reducer;
