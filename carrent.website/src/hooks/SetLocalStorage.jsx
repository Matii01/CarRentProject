import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser, logoutUser } from "../features/user/userSlice";

function SetLocalStorage() {
  const dispatch = useDispatch();

  function updateLocalStorage(tokens) {
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
    const decodedAccessToken = jwtDecode(tokens.accessToken);
    // dispatch(
    //   setIsUserLogin({
    //     exp: decodedAccessToken.exp,
    //   })
    // );
  }

  function setTokens(data) {
    console.log("set token ");
    console.log(data.token.refreshToken);
    localStorage.setItem("accessToken", data.token.accessToken);
    localStorage.setItem("refreshToken", data.token.refreshToken);

    const decodedAccessToken = jwtDecode(data.token.accessToken);

    // const d1 = new Date(decodedAccessToken.exp);
    // const d2 = new Date(decodedAccessToken.exp * 1000);

    //console.log(decodedAccessToken);
    console.log("update user from setLocal storage ");
    dispatch(
      updateUser({
        isLogin: true,
        id: data.userId,
        name: data.userName,
        role: data.role,
        exp: decodedAccessToken.exp,
      })
    );
  }

  function deleteTokens() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(logoutUser({}));
  }

  return [setTokens, updateLocalStorage, deleteTokens];
}

export default SetLocalStorage;
