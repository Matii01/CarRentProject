import { useDispatch, useSelector } from "react-redux";
import { setUserName, setUserRoles } from "./../shared/userSlice";
import jwtInterceptor from "../utils/jwtInterceptor";
import { useEffect } from "react";

function useRefreshToken() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);

  const onFirstRender = () => {
    retriveData();
  };

  const everySomeMinutes = () => {
    if (isLogin) {
      //console.log("try to refresh token");
      refreshToken();
    } else {
      //console.log("is not log in");
    }
  };

  const timeToWait = () => {
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
  }, []);

  const refreshToken = () => {
    fetchData(`/token/refresh`);
  };

  const isTokensSet = () => {
    const item = localStorage.getItem("refreshToken");
    if (item) {
      return true;
    }
    //console.log("token null");
    return false;
  };

  const retriveData = () => {
    //console.log("try to retrive data from token");

    if (isTokensSet()) {
      const url = "/token/retrieve";
      fetchData(url);
    }
  };

  const fetchData = (url) => {
    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem("accessToken");
    jwtInterceptor
      .post(`${url}`, JSON.stringify({ accessToken, refreshToken }), {
        headers: {
          "Content-Type": "application/json",
        },
      })
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
  };
}

export default useRefreshToken;
