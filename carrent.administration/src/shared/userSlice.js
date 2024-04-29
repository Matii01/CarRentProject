import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  role: [],
  accessToken: "",
  refreshToken: "",
  routes: {},
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload.userName;
    },
    setUserRoles: (state, action) => {
      state.role = action.payload.role;
    },
    setAccesToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    setRefreshToken: (state, action) => {
      state.accessToken = action.payload.refreshToken;
    },
  },
});

export const { setUserName, setUserRoles, setAccesToken, setRefreshToken } =
  userSlice.actions;
export const selectUserName = (state) => userSlice.user.userName;
export default userSlice.reducer;
