import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import loadingSlice from "../features/loading/loadingSlice";
import { carRentApi } from "../api/carRentApi";

export default configureStore({
  reducer: {
    user: userReducer,
    loading: loadingSlice,
    [carRentApi.reducerPath]: carRentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(carRentApi.middleware),
});
