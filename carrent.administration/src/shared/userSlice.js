import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  role: [],
  routes: {},
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUserName: (state, action) => {
      console.log("update userName");
      state.userName = action.payload.userName;
    },
    setUserRoles: (state, action) => {
      console.log("update role");
      state.role = action.payload.role;
    },
  },
});

export const { setUserName, setUserRoles } = userSlice.actions;
export const selectUserName = (state) => userSlice.user.userName;
export default userSlice.reducer;
