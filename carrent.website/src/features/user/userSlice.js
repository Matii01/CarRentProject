import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  id: null,
  name: "",
  role: "",
  exp: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    updateUser: (state, action) => {
      console.log("update use in userSlice");
      const { isLogin, id, name, role, exp } = action.payload;
      console.log(isLogin);
      state.isLogin = isLogin;
      state.id = id;
      state.name = name;
      state.role = role;
      state.exp = exp;
    },
    setIsUserLogin: (state, action) => {
      console.log("setIslogin sad sa das dsa");
      const isUserLogin = action.payload;
      state.isLogin = isUserLogin;
      console.log("setIsUserLogin: " + isUserLogin);
    },
    logoutUser: (state) => {
      state.isLogin = false;
      state.id = null;
      state.name = "";
      state.role = "";
      state.exp = "";
    },
  },
});

export const { updateUser, setIsUserLogin, logoutUser } = userSlice.actions;

export const selectIsLogin = (state) => userSlice.user.isLogin;
export default userSlice.reducer;
