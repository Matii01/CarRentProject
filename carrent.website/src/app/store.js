import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import loadingSlice from "../features/loading/loadingSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    loading: loadingSlice,
  },
});
