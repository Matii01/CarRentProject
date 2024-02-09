import { useDispatch, useSelector } from "react-redux";
import {
  setUserName,
  setUserRoles,
  setAccesToken,
  setRefreshToken,
} from "./../shared/userSlice";
import { useEffect } from "react";
import config from "../../config";
import jwtInterceptor from "../utils/jwtInterceptor";

function useRefreshToken() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.userName);

  const onFirstRender = () => {
    console.log("on first");
    retriveData();
  };

  const getUserName = () => {
    return isLogin;
  };

  const everySomeMinutes = () => {
    const name = getUserName();
    if (name != "") {
      console.log("try to refresh token");
      refreshToken();
    } else {
      console.log("is not log in");
    }
  };

  const timeToWait = () => {
    //return 10 * 1000;
    return 10 * 60 * 1000;
  };

  useEffect(() => {
    onFirstRender();

    const seconds = timeToWait();
    const interval = setInterval(() => {
      //console.log(seconds);
      //console.log("called every intervally");
      everySomeMinutes();
    }, seconds);

    return () => clearInterval(interval);
  }, [isLogin]);

  const refreshToken = () => {
    //console.log("refresh token");
    fetchData(`token/refresh`);
  };

  const isTokensSet = () => {
    const item = localStorage.getItem("refreshToken");
    if (item) {
      return true;
    }
    return false;
  };

  const retriveData = () => {
    //console.log("try to retrive data from token");

    if (isTokensSet()) {
      const url = "token/retrieve";
      fetchData(url);
    } else {
      console.log("token do not set");
    }
  };

  const fetchData = (url) => {
    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem("accessToken");
    // console.log("AC:");
    // console.log(accessToken);

    jwtInterceptor
      .post(
        `${config.API_URL}${url}`,
        JSON.stringify({ accessToken, refreshToken }),
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        setLocalStorage(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setLocalStorage = (data) => {
    //console.log("setLocalStorage", data.data);
    localStorage.setItem("accessToken", data.token.accessToken);
    localStorage.setItem("refreshToken", data.token.refreshToken);
    dispatch(setUserName({ userName: data.userName }));
    dispatch(setUserRoles({ role: data.role }));
    dispatch(setAccesToken({ accessToken: data.token.accessToken }));
    dispatch(setRefreshToken({ refreshToken: data.token.refreshToken }));
  };
}

export default useRefreshToken;
